import loadingCube from "../assets/lottie/loaders/loadingCube.json";
import isometricCubesLoader from "../assets/lottie/loaders/isometricCubesLoader.json";
import isometricCubesLoaderSpaced from "../assets/lottie/loaders/isometricCubesLoaderSpaced.json";
import quadCubeShifter from "../assets/lottie/loaders/quadCubeShifter.json";
import shiftingCubes from "../assets/lottie/loaders/shiftingCubes.json";
import squishyIsometricCubeLoader from "../assets/lottie/loaders/squishyIsometricCubeLoader.json";

const loaders = [
  loadingCube,
  isometricCubesLoader,
  isometricCubesLoaderSpaced,
  quadCubeShifter,
  shiftingCubes,
  squishyIsometricCubeLoader,
];

const getRandomLoader = () => {
  const randomNum = Math.floor(Math.random() * loaders.length);
  return loaders[randomNum];
};

export default getRandomLoader;
