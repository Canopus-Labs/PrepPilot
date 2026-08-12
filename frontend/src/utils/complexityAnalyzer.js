import { parse } from "@babel/parser";

const LOOP_TYPES = new Set(["ForStatement", "WhileStatement", "DoWhileStatement"]);
const LINEAR_ARRAY_METHODS = new Set(["forEach", "map", "filter", "find", "some", "every", "reduce"]);
const COMPLEXITY_BY_DEPTH = ["O(1)", "O(n)", "O(n²)", "O(n³)", "O(n⁴)", "O(n^k)"];

function complexityForDepth(depth) {
  return COMPLEXITY_BY_DEPTH[Math.min(depth, COMPLEXITY_BY_DEPTH.length - 1)];
}

function walk(node, visitor, state) {
  if (!node || typeof node !== "object") return;
  visitor(node, state);

  for (const [key, value] of Object.entries(node)) {
    if (key === "loc" || key === "start" || key === "end") continue;
    if (Array.isArray(value)) {
      value.forEach((child) => {
        if (child && typeof child.type === "string") walk(child, visitor, state);
      });
    } else if (value && typeof value.type === "string") {
      walk(value, visitor, state);
    }
  }
}

function getLoopDepth(node, currentDepth = 0) {
  if (!node || typeof node !== "object") return currentDepth;
  const nextDepth = LOOP_TYPES.has(node.type) ? currentDepth + 1 : currentDepth;
  let maxDepth = nextDepth;

  for (const [key, value] of Object.entries(node)) {
    if (key === "loc" || key === "start" || key === "end") continue;
    if (Array.isArray(value)) {
      value.forEach((child) => {
        if (child && typeof child.type === "string") {
          maxDepth = Math.max(maxDepth, getLoopDepth(child, nextDepth));
        }
      });
    } else if (value && typeof value.type === "string") {
      maxDepth = Math.max(maxDepth, getLoopDepth(value, nextDepth));
    }
  }

  return maxDepth;
}

function analyzeSpace(ast) {
  let dynamicAllocation = false;
  let recursiveCall = false;
  const functionNames = new Set();

  walk(ast, (node) => {
    if (node.type === "FunctionDeclaration" && node.id?.name) functionNames.add(node.id.name);
    if (node.type === "ArrayExpression" || node.type === "NewExpression") dynamicAllocation = true;
    if (node.type === "CallExpression" && node.callee?.type === "MemberExpression" && node.callee.property?.name === "push") {
      dynamicAllocation = true;
    }
  }, {});

  walk(ast, (node) => {
    if (node.type === "CallExpression" && node.callee?.type === "Identifier" && functionNames.has(node.callee.name)) {
      recursiveCall = true;
    }
  }, {});

  if (recursiveCall) return "O(n) or O(depth)";
  if (dynamicAllocation) return "O(n)";
  return "O(1)";
}

function analyzeLoops(ast) {
  let loopCount = 0;
  let recursiveFunctionCount = 0;
  const functionNames = new Set();
  const arrayMethodLoops = [];

  walk(ast, (node) => {
    if (LOOP_TYPES.has(node.type)) loopCount += 1;
    if (node.type === "FunctionDeclaration" && node.id?.name) functionNames.add(node.id.name);
    if (
      node.type === "CallExpression" &&
      node.callee?.type === "MemberExpression" &&
      !node.callee.computed &&
      LINEAR_ARRAY_METHODS.has(node.callee.property?.name)
    ) {
      arrayMethodLoops.push(node.callee.property.name);
    }
  }, {});

  walk(ast, (node) => {
    if (node.type === "CallExpression" && node.callee?.type === "Identifier" && functionNames.has(node.callee.name)) {
      recursiveFunctionCount += 1;
    }
  }, {});

  return {
    maxLoopDepth: getLoopDepth(ast),
    loopCount,
    recursiveFunctionCount,
    arrayMethodLoops,
  };
}

export function analyzeJavaScriptComplexity(code) {
  if (!code?.trim()) {
    return {
      status: "empty",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      explanation: "Write some JavaScript code to analyze its complexity.",
      warnings: [],
    };
  }

  try {
    const ast = parse(code, { sourceType: "unambiguous", plugins: ["jsx", "typescript"] });
    const loops = analyzeLoops(ast);
    const timeComplexity = loops.maxLoopDepth > 0
      ? complexityForDepth(loops.maxLoopDepth)
      : loops.arrayMethodLoops.length > 0
        ? "O(n)"
        : loops.recursiveFunctionCount > 0
          ? "O(n) or O(branching^depth)"
          : "O(1)";
    const warnings = [];

    if (loops.maxLoopDepth >= 2) {
      warnings.push(`${loops.maxLoopDepth} nested loop levels detected; the dominant loop structure is approximately ${timeComplexity}.`);
    } else if (loops.loopCount === 1 || loops.arrayMethodLoops.length > 0) {
      warnings.push("A linear traversal was detected; review the input size to confirm O(n) behavior.");
    }

    if (loops.recursiveFunctionCount > 0) {
      warnings.push("Recursive function calls were detected. Recursion depth and branching determine the final complexity.");
    }

    if (loops.arrayMethodLoops.length > 0) {
      warnings.push(`Array traversal method(s) detected: ${[...new Set(loops.arrayMethodLoops)].join(", ")}.`);
    }

    return {
      status: "success",
      timeComplexity,
      spaceComplexity: analyzeSpace(ast),
      explanation:
        loops.loopCount === 0 && loops.recursiveFunctionCount === 0 && loops.arrayMethodLoops.length === 0
          ? "No loop or recursive traversal was detected. The analyzed operations are treated as constant-time by this heuristic."
          : "This is a static heuristic based on the parsed AST. It estimates dominant loop nesting and common allocation patterns; it is not a formal proof of Big-O complexity.",
      warnings,
      metrics: {
        loopCount: loops.loopCount,
        maxLoopDepth: loops.maxLoopDepth,
        recursiveCalls: loops.recursiveFunctionCount,
      },
    };
  } catch (error) {
    return {
      status: "error",
      timeComplexity: "—",
      spaceComplexity: "—",
      explanation: "The code is incomplete or contains a syntax error, so it cannot be analyzed yet.",
      warnings: [error.message?.split("\n")[0] || "Unable to parse the code."],
    };
  }
}
