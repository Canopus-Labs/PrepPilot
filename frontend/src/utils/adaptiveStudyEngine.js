/**
 * Knowledge Graph mapping algorithmic concepts.
 * A Directed Acyclic Graph (DAG) representing concept dependencies.
 */
const knowledgeGraph = {
  'Arrays': { prerequisites: [] },
  'Pointers': { prerequisites: ['Arrays'] },
  'Recursion': { prerequisites: [] },
  'Trees': { prerequisites: ['Pointers', 'Recursion'] },
  'Dynamic Programming': { prerequisites: ['Recursion'] },
  'Graphs': { prerequisites: ['Trees', 'Arrays'] },
};

/**
 * Generates the next recommended topic by traversing the DAG based on user performance.
 * 
 * @param {Object} performanceMap - Map of topics to failure/success rates (0.0 to 1.0)
 * @returns {Object} Recommendation object containing the topic name and reasoning.
 */
export const generateNextTopic = (performanceMap) => {
  // Find topics the user is struggling with (success rate < 0.6)
  const weakTopics = Object.keys(performanceMap).filter(topic => performanceMap[topic] < 0.6);

  if (weakTopics.length === 0) {
    return {
      name: 'Advanced System Design',
      reason: 'You are performing exceptionally well across all core data structures!',
      prerequisites: Object.keys(knowledgeGraph)
    };
  }

  // Pick the first weak topic, but ensure they aren't failing its prerequisites
  const targetTopic = weakTopics[0];
  const node = knowledgeGraph[targetTopic];

  if (!node) {
      return { name: targetTopic, reason: 'Target practice.', prerequisites: [] };
  }

  // Check if they are struggling because they lack the foundation
  for (const prereq of node.prerequisites) {
    if (performanceMap[prereq] === undefined || performanceMap[prereq] < 0.7) {
      return {
        name: prereq,
        reason: `Before mastering ${targetTopic}, you need to strengthen your foundation in ${prereq}.`,
        prerequisites: knowledgeGraph[prereq]?.prerequisites || []
      };
    }
  }

  // If prerequisites are solid, but they are failing the target topic, recommend the target topic
  return {
    name: targetTopic,
    reason: `You have mastered the prerequisites, but you need more practice with ${targetTopic} to pass interviews.`,
    prerequisites: node.prerequisites
  };
};
