import { closest } from "fastest-levenshtein";

type GetActivePathArgs = {
  currentPath: string;
  paths: string[];
  pathsToIgnore?: string[];
};

export const getActivePath = ({
  currentPath,
  paths,
  pathsToIgnore,
}: GetActivePathArgs) => {
  const closestPath = closest(currentPath, paths.concat(pathsToIgnore || []));
  const index = paths.indexOf(closestPath);
  return { active: closestPath, activeIndex: index };
};
