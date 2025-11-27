import { skills as skillsIndex } from './skills/index';
import { dockerData } from './skills/docker';

// Aggregate all skill data
// For now, only Docker has full data, others are placeholders
const skillsDataMap = {
  docker: dockerData,
};

// Merge index with full data where available
export const skills = skillsIndex.map(skill => {
  const fullData = skillsDataMap[skill.slug];
  if (fullData) {
    return {
      ...skill,
      ...fullData,
      // Keep metadata from index
      conceptsCount: skill.conceptsCount,
      commandsCount: skill.commandsCount,
      qaCount: skill.qaCount,
      troubleshootingCount: skill.troubleshootingCount,
      estimatedHours: skill.estimatedHours,
    };
  }
  return {
    ...skill,
    // Add empty arrays for skills without full data
    concepts: [],
    commands: [],
    qa: [],
    troubleshooting: [],
  };
});

export default skills;
