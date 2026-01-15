import React, { useEffect, useState } from 'react';
import Main from '../components/section/Main';
import { useParams } from 'react-router-dom';
import VideoSearch from '../components/videos/VideoSearch';
import { fetchFromAPI } from '../utils/api';

const Search = () => {
  const { searchId } = useParams();
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);

  useEffect(() => {
    setVideos([]);
    fetchVideos(searchId);
  }, [searchId]);

  const fetchVideos = (query, pageToken = '') => {
    fetchFromAPI(`search?part=snippet&q=${query}&pageToken=${pageToken}`)
      .then((data) => {
        setNextPageToken(data.nextPageToken);
        setVideos((prevVideos) => [...prevVideos, ...data.items]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleLoadMore = () => {
    if (nextPageToken) {
      fetchVideos(searchId, nextPageToken);
    }
  };

  return (
    <Main title="유튜브 검색" description="유튜브 검색 결과 페이지입니다.">
      <section id="searchPage">
        <div className="video__inner search">
          <VideoSearch videos={videos} />
        </div>
        <div className="video__more">
          {nextPageToken && <button onClick={handleLoadMore}>더 보기</button>}
        </div>
      </section>
    </Main>
  );
};

export default Search;
