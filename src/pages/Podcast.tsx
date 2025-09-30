// src/pages/Podcast.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setPodcastEpisodes } from '../redux/podcastSlice';

const Podcast: React.FC = () => {
  const dispatch = useDispatch();
  const episodes = useSelector((state: RootState) => state.podcast.episodes);

  useEffect(() => {
    dispatch(setPodcastEpisodes(["Episode 1: Introduction to Moving", "Episode 2: Tips for International Moves"]));
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h1>Podcast Episodes</h1>
      <ul className="list-group">
        {episodes.map((episode, index) => (
          <li key={index} className="list-group-item">{episode}</li>
        ))}
      </ul>
    </div>
  );
};

export default Podcast;
