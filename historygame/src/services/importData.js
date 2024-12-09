import { importDadosdaAPI } from "./importDadosdaAPI.js";
import fs from 'fs';
import { db } from './firebaseConfig.js';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';

function sleep(ms) { 
  return new Promise(resolve => setTimeout(resolve, ms)); 
  } 
async function throttledImportDadosdaAPI(tabela, query) { 
  await sleep(260); 
  return importDadosdaAPI(tabela, query); 
}


async function runImport() {

  const games = await throttledImportDadosdaAPI("games", "fields id, age_ratings, alternative_names, artworks, category, checksum, collections, cover, first_release_date, franchise, franchises, game_engines, game_modes, genres, involved_companies, keywords, language_supports, multiplayer_modes, name, parent_game, platforms, player_perspectives, screenshots, similar_games, slug, status, storyline, summary, themes, updated_at, url, version_parent, version_title, videos, websites; where id = 279634");   
   
    let updatedGames = await Promise.all(games.map(async game => {
      const ageRatings = game.age_ratings?.length ? await throttledImportDadosdaAPI("age_ratings", `fields id, rating; where id = (${game.age_ratings.join(',')});`) : [];
      const alternativeNames = game.alternative_names?.length ? await throttledImportDadosdaAPI("alternative_names", `fields id, name; where id = (${game.alternative_names.join(',')});`) : [];
      const artworks = await throttledImportDadosdaAPI("artworks", `fields game, url; where game = ${game.id};`);
      const collections = game.collections?.length ? await throttledImportDadosdaAPI("collections", `fields id, name; where id = (${game.collections.join(',')});`) : [];
      const covers = game.cover ? await throttledImportDadosdaAPI("covers", `fields id, url; where id = ${game.cover};`) : [];    
      const franchises = game.franchises?.length ? await throttledImportDadosdaAPI("franchises", `fields id, name; where id = (${game.franchises.join(',')});`) : [];  
      const gameEngines = game.game_engines?.length ? await throttledImportDadosdaAPI("game_engines", `fields id, name; where id = (${game.game_engines.join(',')});`) : []; 
      const gameModes = game.game_modes?.length ? await throttledImportDadosdaAPI("game_modes", `fields id, name; where id = (${game.game_modes.join(',')});`) : [];   
      const genres = game.genres?.length ? await throttledImportDadosdaAPI("genres", `fields id, name; where id = (${game.genres.join(',')});`) : [];
      const keywords = game.keywords?.length ? await throttledImportDadosdaAPI("keywords", `fields id, name; where id = (${game.keywords.join(',')});`) : [];
      const platforms = game.platforms?.length ? await throttledImportDadosdaAPI("platforms", `fields id, name; where id = (${game.platforms.join(',')});`) : [];
      const playerPerspectives = game.player_perspectives?.length ? await throttledImportDadosdaAPI("player_perspectives", `fields id, name; where id = (${game.player_perspectives.join(',')});`) : [];
      const screenshots = game.screenshots?.length ? await throttledImportDadosdaAPI("screenshots", `fields id, url; where id = (${game.screenshots.join(',')});`) : [];
      const themes = game.themes?.length ? await throttledImportDadosdaAPI("themes", `fields id, name; where id = (${game.themes.join(',')});`) : [];
      const videos = game.videos?.length ? await throttledImportDadosdaAPI("game_videos", `fields id, video_id; where id = (${game.videos.join(',')});`) : [];
      const websites = game.websites?.length ? await throttledImportDadosdaAPI("websites", `fields id, url; where id = (${game.websites.join(',')});`) : [];
      return { 
      ...game,
            age_ratings: ageRatings.map(ageRating => ageRating.rating).sort(),
            alternative_names: alternativeNames.map(altName => altName.name).sort(),
            artworks: artworks.map(artwork => artwork.url).sort(),
            collections: collections.map(collection => collection.name).sort(),
            cover: covers.length > 0 ? covers[0].url : null,
            franchises: franchises.map(franchise => franchise.name).sort(),
            game_engines: gameEngines.map(engine => engine.name).sort(),
            game_modes: gameModes.map(mode => mode.name).sort(),
            genres: genres.map(genre => genre.name).sort(),
            keywords: keywords.map(keyword => keyword.name).sort(),
            platforms: platforms.map(platform => platform.name).sort(),
            player_perspectives: playerPerspectives.map(playerPerspective => playerPerspective.name).sort(),
            screenshots: screenshots.map(screenshot => screenshot.url).sort(),
            themes: themes.map(theme => theme.name).sort(),
            videos: videos.map(video => video.video_id).sort(),
            websites: websites.map(website => website.url).sort()
        }; }));
    

    const data = updatedGames
    const batch = writeBatch(db);
     data.forEach((dado) => {
       const docRef = doc(collection(db, 'games2'));
       batch.set(docRef,dado);
     });

     await batch.commit();
     console.log(`Dados da tabela games2 importados com sucesso!`);      
  console.log('Importação concluída.');
}

runImport();
