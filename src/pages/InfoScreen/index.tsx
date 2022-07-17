import classNames from "classnames";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import AnimeCard from "../../components/AnimeCard";
import Button from "../../components/Button";
import EpisodeChunk from "../../components/EpisodeChunk";
import Image from "../../components/Image";
import Skeleton from "../../components/Skeleton";
import { GENRES } from "../../constants";
import { Anime, Episode as EpisodeType } from "../../types";
import { chunk, numberWithCommas } from "../../utils";
import Storage from "../../utils/Storage";
import useBrowseList from "../BrowseScreen/useBrowseList";
import useFetchInfo from "./useFetchInfo";

const InfoScreen = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  if (!slug) {
    navigate("/");
  }
  const storedInfo = Storage.findOne<Anime>("recent", { slug });

  const handleEpisodeClick = (_e: EpisodeType, index: number) => {
    navigate(`/watch/${slug}?episode_index=${index}`);
  };

  const { data: info, isLoading } = useFetchInfo(slug);
  if (info !== undefined) {
    let genreSlug = info.genres.map(item => item.slug)
    let random = Math.floor(Math.random() * info?.genres?.length)
    while(GENRES.map(item => item.slug).includes(genreSlug[random])){
      random--;
    }
  }
  const { data } =
    useBrowseList({ category: "genres", slug: info?.genres[Math.floor(Math.random() * info?.genres.length)].slug });
  const list = data?.pages.map((list) => list.data).flat();
  const handleClick = (index = 0) => {
    return () => navigate(`/watch/${slug}?episode_index=${index}`);
  };

  return (
    <div className="py-16">
      <div className="w-full">
        <div className="w-full h-56 overflow-hidden">
          {isLoading ? (
            <Skeleton className="w-full h-full">
              <div className="w-full h-full bg-gray-600"></div>
            </Skeleton>
          ) : (
            <Image
              src={info?.thumbnail!}
              className="w-full object-cover filter blur-lg opacity-30"
            />
          )}
        </div>
        <div className="space-y-4 md:space-x-4 w-full px-2 md:px-12 lg:px-24 -mt-28 md:-mt-14 flex items-center justify-center flex-col md:items-start md:justify-start md:flex-row">
          <div className="w-full md:w-44 lg:w-52 space-y-4 md:space-y-0">
            {isLoading ? (
              <Skeleton>
                <div className="border-4 border-background bg-gray-600 mx-auto w-44 lg:w-52 h-60 lg:h-80 rounded-md md:rounded-b-none"></div>
              </Skeleton>
            ) : (
              <Image
                src={info?.thumbnail!}
                alt={info?.name}
                className={classNames(
                  "mx-auto filter blur-none w-44 lg:w-52 h-60 lg:h-80 object-cover rounded-md md:rounded-b-none"
                )}
              />
            )}

            {!isLoading && (
              <div
                className={classNames(
                  "text-white md:bg-background-darker p-3 w-full space-y-2 rounded-b-md min-h-11"
                )}
              >
                <h1 className="text-base line-clamp-2">{info?.name}</h1>

                <div>
                  <h1 className="text-sm line-clamp-1">
                    Nhóm sub: {info?.subTeams.join(", ")}
                  </h1>
                  <h1 className="text-sm line-clamp-1">
                    Lượt xem: {numberWithCommas(info?.views)}
                  </h1>
                </div>
              </div>
            )}
          </div>
          <div className="w-full px-2 flex flex-col flex-1">
            {
              (!isLoading && info?.episodes?.length) ? <div className="flex-col md:flex-row space-x-2 space-y-2 md:space-y-0 -mt-2 self-center md:self-start flex items-center font-bold text-lg text-white filter blur-none">
                <Button
                  className="bg-background-darker hover:bg-opacity-80"
                  onClick={handleClick()}
                  startIcon={BsPlayFill}
                  iconSize={20}
                >
                  Xem ngay
                </Button>
                {!isLoading && info?.episodes?.length && storedInfo && (
                  <Button
                    className="bg-background-darker hover:bg-opacity-80"
                    onClick={handleClick(storedInfo.episodeIndex)}
                    startIcon={BsPlayFill}
                    iconSize={20}
                  >
                    Xem {info?.episodes[storedInfo.episodeIndex!].full_name}
                  </Button>
                )}
              </div> : <div className="flex-col md:flex-row space-x-2 space-y-2 md:space-y-0 -mt-2 self-center md:self-start flex items-center font-bold text-lg text-white filter blur-none">Phim sắp chiếu</div>
            }


            <div className="mt-6 space-y-2">
              <div className="space-y-1">
                {isLoading ? (
                  <Skeleton>
                    <div className="h-8 bg-gray-600"></div>
                  </Skeleton>
                ) : (
                  <h1 className="text-white text-2xl">{info?.name}</h1>
                )}

                {isLoading ? (
                  <Skeleton>
                    <div className="h-6 bg-gray-600"></div>
                  </Skeleton>
                ) : (
                  <h1 className="text-gray-400 text-base">
                    Thể loại: {info?.genres.map(({ name }) => name).join(", ")}
                  </h1>
                )}
              </div>

              {isLoading ? (
                <Skeleton>
                  <div className="h-6 bg-gray-600"></div>
                </Skeleton>
              ) : (
                <h1 className="text-gray-300 text-base">{info?.description}</h1>
              )}
            </div>
          </div>
        </div>
        {!isLoading && (
          <div className="space-y-2 w-full px-4 md:px-32 py-16">
            {chunk<EpisodeType>(info?.episodes!, 18).map((chunk, i) => {
              const firstEpisode = chunk[0];
              const lastEpisode = chunk[chunk.length - 1];

              return (
                <EpisodeChunk
                  buttonClassName="bg-background-darker"
                  title={`Tập ${firstEpisode.name} - Tập ${lastEpisode.name}`}
                  episodes={chunk}
                  key={i}
                  episodeOnClick={handleEpisodeClick}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-6">
        <div className="items-baseline space-x-2 text-white mb-3">
          <h1 className="mx-5 text-2xl block font-medium">Các phim có thể bạn thích</h1>
          <div className="my-12 flex flex-wrap">
            {!isLoading &&
              list?.map((anime) => (
                <div
                  className="mt-2 -mr-2 px-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
                  key={anime.slug}
                >
                  <AnimeCard {...anime} />
                </div>
              ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default InfoScreen;
