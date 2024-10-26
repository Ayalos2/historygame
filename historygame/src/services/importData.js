import { importDadosdaAPI } from "./importDadosdaAPI.js";

async function runImport() {
  await importDadosdaAPI("games","fields id, age_ratings,alternative_names,artwork,category,checksum,collections,cover,first_release_date,franchise,franchises,game_engines,game_modes,genres,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,screenshots,similar_games,slug,status,storyline,summary,themes,updated_at,url,version_parent,version_title,videos,websites;");
  
  await importDadosdaAPI("age_ratings","fields id, category,checksum,content_descriptions,rating,rating_cover_url,synopsis;");
  await importDadosdaAPI("age_rating_content_descriptions","fields id,category,checksum,description;");

  await importDadosdaAPI("alternative_names","fields id,checksum,comment,game,name;");
  await importDadosdaAPI("artworks","fields id, alpha_channel,animated,checksum,game,height,image_id,url,width;");

  await importDadosdaAPI("companies","fields id, name, slug, url, checksum;");
  await importDadosdaAPI("covers","fields id, alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;");

  await importDadosdaAPI("franchises","fields id,checksum,created_at,games,name,slug,updated_at,url;");
  
  await importDadosdaAPI("genres","fields fields id, checksum,created_at,name,slug,updated_at,url;");
  await importDadosdaAPI("game_engines","fields id,checksum,companies,created_at,description,logo,name,platforms,slug,updated_at,url;");
  await importDadosdaAPI("game_modes","fields id, checksum,created_at,name,slug,updated_at,url;");
  await importDadosdaAPI("game_videos","fields id,checksum,game,name,video_id;");
  await importDadosdaAPI("involved_companies","fields id, checksum,company,created_at,developer,game,publisher,supporting,updated_at;");
  
  await importDadosdaAPI("languages","fields id,checksum,created_at,locale,name,native_name,updated_at;");
  await importDadosdaAPI("language_supports","fields id,checksum,created_at,game,language,language_support_type,updated_at;");

  await importDadosdaAPI("multiplayer_modes","fields id,campaigncoop,checksum,dropin,game,lancoop,offlinecoop,offlinecoopmax,offlinemax,onlinecoop,onlinecoopmax,onlinemax,platform,splitscreen,splitscreenonline;");

  await importDadosdaAPI("platforms","fields id, abbreviation,alternative_name,category,checksum,generation,name,platform_family,platform_logo,slug,summary,updated_at,url,versions,websites;");
  await importDadosdaAPI("player_perspectives", "fields id,checksum,created_at,name,slug,updated_at,url;");

  await importDadosdaAPI("screenshots","fields id, alpha_channel,animated,checksum,game,height,image_id,url,width;");

  await importDadosdaAPI("themes","fields id, checksum,created_at,name,slug,updated_at,url;");
  
  await importDadosdaAPI("websites","fields id,category,checksum,game,trusted,url;");
  
  console.log('Importação concluída.');
}

runImport();
