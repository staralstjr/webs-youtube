import React, { useEffect, useState } from 'react';
import Main from '../components/section/Main';
import { Link, useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/api';
import { CiChat1, CiRead, CiStar } from 'react-icons/ci';

const Video = () => {
  const { videoId } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);

  useEffect(() => {
    setVideoDetail(null);
    fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
      .then((data) => {
        if (data?.items?.length > 0) {
          setVideoDetail(data.items[0]);
        }
      })
      .catch((err) => console.error('API Error:', err));
  }, [videoId]);

  if (!videoDetail)
    return (
      <Main title="로딩 중...">
        <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>
          데이터 로딩 중...
        </div>
      </Main>
    );

  return (
    <Main
      title="유튜브 비디오 영상"
      description="유튜브 비디오 영상을 볼 수 있습니다."
    >
      <section id="videoViewPage">
        <div className="video__view">
          <div className="video__play">
            {/* 라이브러리 대신 iframe 사용 (가장 확실한 방법) */}
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={videoDetail.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0 }}
            ></iframe>
          </div>

          <div className="video__info">
            <h2 className="video__title">{videoDetail.snippet.title}</h2>
            <div className="video__channel">
              <div className="id">
                <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                  {videoDetail.snippet.channelTitle}
                </Link>
              </div>
              <div className="count">
                <span className="view">
                  <CiRead />{' '}
                  {Number(videoDetail.statistics.viewCount).toLocaleString()}
                </span>
                <span className="like">
                  <CiStar />{' '}
                  {Number(videoDetail.statistics.likeCount).toLocaleString()}
                </span>
                <span className="comment">
                  <CiChat1 />{' '}
                  {Number(videoDetail.statistics.commentCount).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="video_desc">{videoDetail.snippet.description}</div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Video;
