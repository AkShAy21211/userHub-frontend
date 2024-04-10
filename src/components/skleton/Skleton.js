import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Skleton = ({count}) => {
  return (
     <SkeletonTheme  baseColor="#202020" highlightColor="#444">
    <p>
      <Skeleton count={count} />
    </p>
  </SkeletonTheme>
  )
}

export default Skleton
