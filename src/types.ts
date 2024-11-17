import React from "react";

//set interface for Route
export interface Route {
  name: string;
  path: string;
  component: React.ComponentType;
  dropdown?: boolean;
  dropdownData?: any[];
  header: boolean;
  dropdownPath?: (data: any) => string;
  listKey?: (data: any) => string;
  navigation?: boolean;
  icon?: React.ComponentType<Icon>;
}

export interface Icon {
  size?: number;
  className?: string;
}

//properties of episode (add videoSource: string)
export interface Episode {
  id: number;
  name: number;
  special_name: number;
  detail_name: string | null;
  full_name: string;
  film_name: string;
  slug: string;
  link: string;
  views: number;
  is_copyrighted: boolean | null;
  has_preview: boolean | null;
  thumbnail_small: string;
  thumbnail_medium: string;
  upcoming: boolean | null;
}

export interface Source extends Episode {
  videoSource: string;
}

//properties of anime's information in infoScreen
export interface AnimeInfo {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  views: number;
  genres: Genre[];
  likes: number;
  follows: number;
  subTeams: string[];
  description: string;
  episodes: Episode[];
}

//properties of anime's information in HomePage, Genres
export interface Anime {
  id: number;
  name: string;
  thumbnail: string;
  time: string;
  slug: string;
  views: number;
  latestEpisode?: {
    name: string;
    views: number;
  };
  episodeIndex?: number;
}

//properties of Genres
export interface Genre {
  name: string;
  slug: string;
}

//properties of Ranking
export interface Ranking {
  name: string;
  slug: string;
}

export interface Sort {
  name: string;
  slug: string;
}
