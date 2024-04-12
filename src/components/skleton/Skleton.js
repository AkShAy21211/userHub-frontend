import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Skleton = ({ count }) => {
  return (
    <SkeletonTheme baseColor="#8888" highlightColor="#6666">
      <div>
        <Skeleton count={count} />
      </div>
      <div className="mt-4">
        <Skeleton count={count} />
      </div>{" "}
      <div className="mt-4">
        <Skeleton count={count} />
      </div>
    </SkeletonTheme>
  );
};

export default Skleton;
