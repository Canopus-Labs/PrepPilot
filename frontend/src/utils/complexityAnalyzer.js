import { parse } from "@babel/parser";

const LOOP_TYPES = new Set([
  "ForStatement",
  "ForInStatement",
  "ForOfStatement",
  "WhileStatement",
  "DoWhileStatement",
]);
const LINEAR_ARRAY_METHODS = new Set(["forEach", "map", "filter", "find", "some", "every", "reduce"]);
const ALLOCATING_ARRAY_METHODS = new Set(["map", "filter"]);
const COMPLEXITY_BY_DEPTH = ["O(1)", "O(n)", "O(n²)", "O(n³)", "O(n⁴)", "O(n^k)"];

function complexityForDepth(depth) {
  return COMPLEXITY_BY_DEPTH[Math.min(depth, COMPLEXITY_BY_DEPTH.length - 1)];
}

function walk(node, visitor, state = {}) {
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

function isCallable(node) {
  return node?.type === "FunctionDeclaration" || node?.type === "FunctionExpression" || node?.type === "ArrowFunctionExpression";
}

function getCallableName(node, parent) {
  if (node?.id?.name) return node.id.name;
  if (parent?.type === "VariableDeclarator" && parent.id?.type === "Identifier") return parent.id.name;
  if (parent?.type === "AssignmentExpression" && parent.left?.type === "Identifier") return parent.left.name;
  return null;
}

function collectCallables(ast) {
  const callables = [];

  function visit(node, parent = null) {
    if (!node || typeof node !== "object") return;
    if (isCallable(node)) {
      const name = getCallableName(node, parent);
      if (name && node.body) callables.push({ name, body: node.body });
    }

    for (const [key, value] of Object.entries(node)) {
      if (key === "loc" || key === "start" || key === "end") continue;
      if (Array.isArray(value)) {
        value.forEach((child) => {
          if (child && typeof child.type === "string") visit(child, node);
        });
      } else if (value && typeof value.type === "string") {
        visit(value, node);
      }
    }
  }

  visit(ast);
  return callables;
}

function hasRecursiveCall(callable) {
  let recursive = false;

  function visit(node, parent = null) {
    if (!node || typeof node !== "object" || recursive) return;
    if (isCallable(node) && node !== callable.body) return;

    if (
      node.type === "CallExpression" &&
      node.callee?.type === "Identifier" &&
      node.callee.name === callable.name
    ) {
      recursive = true;
      return;
    }

    for (const [key, value] of Object.entries(node)) {
      if (key === "loc" || key === "start" || key === "end") continue;
      if (Array.isArray(value)) {
        value.forEach((child) => {
          if (child && typeof child.type === "string") visit(child, node);
        });
      } else if (value && typeof value.type === "string") {
        visit(value, node);
      }
    }
  }

  visit(callable.body);
  return recursive;
}

function analyzeRecursion(ast) {
  const callables = collectCallables(ast);
  const recursiveCallables = callables.filter(hasRecursiveCall);
  return {
    recursiveFunctionCount: recursiveCallables.length,
    hasRecursion: recursiveCallables.length > 0,
  };
}

function analyzeSpace(ast, recursion) {
  let dynamicAllocation = false;

  walk(ast, (node) => {
    if (node.type === "ArrayExpression" || node.type === "NewExpression") dynamicAllocation = true;
    if (
      node.type === "CallExpression" &&
      node.callee?.type === "MemberExpression" &&
      !node.callee.computed
    ) {
      const method = node.callee.property?.name;
      if (method === "push" || ALLOCATING_ARRAY_METHODS.has(method)) dynamicAllocation = true;
    }
  });

  if (recursion.hasRecursion) return "O(n) or O(depth)";
  if (dynamicAllocation) return "O(n)";
  return "O(1)";
}

function analyzeLoops(ast, recursion) {
  let loopCount = 0;
  const arrayMethodLoops = [];

  walk(ast, (node) => {
    if (LOOP_TYPES.has(node.type)) loopCount += 1;
    if (
      node.type === "CallExpression" &&
      node.callee?.type === "MemberExpression" &&
      !node.callee.computed &&
      LINEAR_ARRAY_METHODS.has(node.callee.property?.name)
    ) {
      arrayMethodLoops.push(node.callee.property.name);
    }
  });

  return {
    maxLoopDepth: getLoopDepth(ast),
    loopCount,
    recursiveFunctionCount: recursion.recursiveFunctionCount,
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
    const ast = parse(code, {
      sourceType: "unambiguous",
      plugins: ["jsx", "typescript"],
    });
    const recursion = analyzeRecursion(ast);
    const loops = analyzeLoops(ast, recursion);

    // Array callbacks represent one traversal of their input. They should not
    // be multiplied with one another by this lightweight heuristic.
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
      spaceComplexity: analyzeSpace(ast, recursion),
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
