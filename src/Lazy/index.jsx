import { useState, useEffect } from "react";
import { getNewPhotos } from "../Redux/nativeThunk";
import { useDispatch, useSelector } from "react-redux";

function Lazy() {
  const dispatch = useDispatch();
  const { photos, totalCount, load } = useSelector(
    (state) => state.nativeSlice
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getPhoto = async () => {
    const data = await dispatch(getNewPhotos(page));
    if (data.meta.requestStatus === "fulfilled") {
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      getPhoto();
    }
  }, [loading]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHeadler);

    return function () {
      document.addEventListener("scroll", scrollHeadler);
    };
  }, []);

  const scrollHeadler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 ||
      photos.length < totalCount
    ) {
      setLoading(true);
    }
  };

  return (
    <div className="App">
      {photos.map((photo) => (
        <div key={photo.id}>
          <div>
            {photo.id}. {photo.title}
          </div>
          <img src={photo.thumbnailUrl} alt="" />
        </div>
      ))}
      {load === "loading" ? "Loading..." : null}
    </div>
  );
}

export { Lazy };
