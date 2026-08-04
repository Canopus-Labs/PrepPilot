export const TIERS = [
  {
    symbol: "O(1)",
    name: "Constant",
    color: "green",
    description:
      "Runtime does not depend on the input size. Always the same number of operations.",
    examples: "Array index access, hash map lookup, push/pop from a stack",
    common: true,
  },
  {
    symbol: "O(log n)",
    name: "Logarithmic",
    color: "green",
    description:
      "Each step cuts the problem in half. Very fast even for huge inputs.",
    examples: "Binary search, balanced BST lookup",
    common: true,
  },
  {
    symbol: "O(n)",
    name: "Linear",
    color: "emerald",
    description:
      "Cost grows directly with the input. One pass over the data.",
    examples: "Scanning an array, linear search, iterating a linked list",
    common: true,
  },
  {
    symbol: "O(n log n)",
    name: "Linearithmic",
    color: "lime",
    description:
      "Split-and-conquer cost. The best achievable for general-purpose comparison sorts.",
    examples: "Merge sort, quick sort (average), heap sort",
    common: true,
  },
  {
    symbol: "O(n²)",
    name: "Quadratic",
    color: "amber",
    description:
      "Nested loops over the input. Becomes slow around 10k+ elements.",
    examples: "Bubble sort, insertion sort, naive matrix multiply",
    common: true,
  },
  {
    symbol: "O(2ⁿ)",
    name: "Exponential",
    color: "rose",
    description:
      "Doubles with each added element. Only usable on tiny inputs.",
    examples: "Brute-force subset generation, naive Fibonacci, TSP",
    common: false,
  },
  {
    symbol: "O(n!)",
    name: "Factorial",
    color: "red",
    description:
      "Worst class in practice. Every permutation is explored.",
    examples: "Brute-force permutation search, traveling salesperson",
    common: false,
  },
];

export const DATA_STRUCTURES = [
  {
    name: "Array",
    average: { access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)" },
    worst: { access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)" },
    note: "Random access is instant; inserting/deleting in the middle shifts everything.",
  },
  {
    name: "Stack",
    average: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
    worst: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
    note: "LIFO. Push/pop only at the top.",
  },
  {
    name: "Queue",
    average: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
    worst: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
    note: "FIFO. Enqueue at the back, dequeue from the front.",
  },
  {
    name: "Singly Linked List",
    average: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
    worst: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
    note: "Insert/delete are O(1) once you have the node; access is O(n).",
  },
  {
    name: "Hash Table",
    average: { access: "—", search: "O(1)", insert: "O(1)", delete: "O(1)" },
    worst: { access: "—", search: "O(n)", insert: "O(n)", delete: "O(n)" },
    note: "Average O(1) assumes a good hash function; worst case is one giant collision bucket.",
  },
  {
    name: "Binary Search Tree",
    average: { access: "O(log n)", search: "O(log n)", insert: "O(log n)", delete: "O(log n)" },
    worst: { access: "O(n)", search: "O(n)", insert: "O(n)", delete: "O(n)" },
    note: "Balanced when built randomly; degenerate to a linked list if sorted input is inserted in order.",
  },
  {
    name: "AVL / Red-Black Tree",
    average: { access: "O(log n)", search: "O(log n)", insert: "O(log n)", delete: "O(log n)" },
    worst: { access: "O(log n)", search: "O(log n)", insert: "O(log n)", delete: "O(log n)" },
    note: "Self-balancing BSTs guarantee O(log n) in the worst case at the cost of rotation bookkeeping.",
  },
  {
    name: "Heap (Priority Queue)",
    average: { access: "O(1)", search: "O(n)", insert: "O(log n)", delete: "O(log n)" },
    worst: { access: "O(1)", search: "O(n)", insert: "O(log n)", delete: "O(log n)" },
    note: "Access is O(1) only for the min/max element.",
  },
  {
    name: "Trie",
    average: { access: "O(k)", search: "O(k)", insert: "O(k)", delete: "O(k)" },
    worst: { access: "O(k)", search: "O(k)", insert: "O(k)", delete: "O(k)" },
    note: "k = key length. Great for prefix queries and autocomplete.",
  },
  {
    name: "Graph (Adjacency List)",
    average: { access: "O(1)", search: "O(V+E)", insert: "O(1)", delete: "O(V+E)" },
    worst: { access: "O(1)", search: "O(V+E)", insert: "O(1)", delete: "O(V+E)" },
    note: "Space O(V+E). Search cost reflects traversals, not edge lookup.",
  },
];

export const SORTING_ALGORITHMS = [
  {
    name: "Bubble Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: true,
    note: "Simple but slow. Best case O(n) only when already sorted with an early-exit flag.",
  },
  {
    name: "Selection Sort",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: false,
    note: "Always quadratic regardless of input; minimal swaps.",
  },
  {
    name: "Insertion Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: true,
    note: "Excellent for small or nearly-sorted arrays; used as the base case of hybrid sorts.",
  },
  {
    name: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: true,
    note: "Stable divide-and-conquer. Guaranteed O(n log n) but needs O(n) auxiliary space.",
  },
  {
    name: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    stable: false,
    note: "Fast in practice with good pivots; worst case on sorted input with a naive pivot.",
  },
  {
    name: "Heap Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)",
    stable: false,
    note: "In-place and always O(n log n), but not stable and has poor cache behavior.",
  },
  {
    name: "Counting Sort",
    best: "O(n+k)",
    average: "O(n+k)",
    worst: "O(n+k)",
    space: "O(k)",
    stable: true,
    note: "Linear only when the key range k is small. Not a comparison sort.",
  },
  {
    name: "Radix Sort",
    best: "O(nk)",
    average: "O(nk)",
    worst: "O(nk)",
    space: "O(n+k)",
    stable: true,
    note: "Digit-by-digit sort; k = number of digits. Linear for fixed-width integers.",
  },
  {
    name: "Bucket Sort",
    best: "O(n+k)",
    average: "O(n+k)",
    worst: "O(n²)",
    space: "O(n)",
    stable: true,
    note: "Distributes into buckets then sorts each; degrades if values cluster unevenly.",
  },
];

export const GRAPH_ALGORITHMS = [
  {
    name: "BFS (Breadth-First Search)",
    complexity: "O(V + E)",
    space: "O(V)",
    note: "Shortest path in unweighted graphs; level-order traversal using a queue.",
  },
  {
    name: "DFS (Depth-First Search)",
    complexity: "O(V + E)",
    space: "O(V)",
    note: "Path finding, cycle detection, topological sort via a stack or recursion.",
  },
  {
    name: "Dijkstra's Algorithm",
    complexity: "O((V + E) log V)",
    space: "O(V)",
    note: "Shortest path in weighted graphs with non-negative weights; uses a min-heap.",
  },
  {
    name: "Bellman-Ford",
    complexity: "O(V * E)",
    space: "O(V)",
    note: "Handles negative weights and detects negative cycles; slower than Dijkstra.",
  },
  {
    name: "Floyd-Warshall",
    complexity: "O(V³)",
    space: "O(V²)",
    note: "All-pairs shortest paths; simple but cubic.",
  },
  {
    name: "Union-Find (DSU)",
    complexity: "O(α(n)) amortized",
    space: "O(n)",
    note: "Near-constant per operation with path compression + union by rank.",
  },
  {
    name: "Topological Sort (Kahn)",
    complexity: "O(V + E)",
    space: "O(V)",
    note: "Orders a DAG; uses in-degree counting and a queue.",
  },
  {
    name: "Kruskal's MST",
    complexity: "O(E log E)",
    space: "O(V)",
    note: "Sorts edges, then builds the MST with Union-Find.",
  },
  {
    name: "Prim's MST",
    complexity: "O(E log V)",
    space: "O(V)",
    note: "Grows the MST from a seed vertex using a priority queue.",
  },
];

export const SEARCH_PATTERNS = [
  {
    name: "Binary Search",
    complexity: "O(log n)",
    space: "O(1)",
    note: "Requires a sorted array. The canonical divide-and-conquer lookup.",
  },
  {
    name: "Two Pointers",
    complexity: "O(n)",
    space: "O(1)",
    note: "Sliding window and two-sum-style problems; often paired with sorting.",
  },
  {
    name: "Sliding Window",
    complexity: "O(n)",
    space: "O(k)",
    note: "Maintains a window over the array; great for substring/subarray problems.",
  },
  {
    name: "HashMap Lookup",
    complexity: "O(n)",
    space: "O(n)",
    note: "Trade space for time to detect duplicates, track counts, or memoize.",
  },
  {
    name: "Memoization (Top-Down DP)",
    complexity: "O(states * transitions)",
    space: "O(states)",
    note: "Caches subproblem results; converts exponential brute force into polynomial DP.",
  },
];
