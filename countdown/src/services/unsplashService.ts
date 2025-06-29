const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY';

export const searchUnsplashImage = async (query: string): Promise<string | null> => {
  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
    console.warn('UNSPLASH_ACCESS_KEY não configurado. Usando imagem de placeholder.');
    // Retorna uma imagem de placeholder se a chave da API não estiver configurada
    return 'https://via.placeholder.com/1920x1080?text=No+Image+Available';
  }

  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.full;
    } else {
      return 'https://via.placeholder.com/1920x1080?text=No+Image+Found';
    }
  } catch (error) {
    console.error('Erro ao buscar imagem do Unsplash:', error);
    return 'https://via.placeholder.com/1920x1080?text=Error+Loading+Image';
  }
};
