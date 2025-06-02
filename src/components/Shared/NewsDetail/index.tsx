import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Divider,
  Link,
  Button
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const NewsDetail = () => {
  const [article, setArticle] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { id } = useParams(); // Đây là encodeURIComponent(article.url)
  const apiKey = import.meta.env.VITE_KEY_API_NEWS;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=cycling&apiKey=${apiKey}`
        );
        const data = await res.json();
        setData(data.articles);

        const decodedUrl = decodeURIComponent(id);
        const matched = data.articles.find(article => article.url === decodedUrl);
        setArticle(matched);
      } catch (err) {
        console.error('Error fetching news detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  useEffect(() => {
    if (data && article) {
      const related = getRelatedArticles(data, article);
      setRelatedArticles(related);
    }
  }, [data, article]);

  const getKeywords = (text = '') => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
  };

  const getRelatedArticles = (articles, currentArticle) => {
    const currentKeywords = getKeywords(currentArticle.title + ' ' + currentArticle.description);
    return articles
      .filter(a => a.url !== currentArticle.url)
      .map((a) => {
        const articleKeywords = getKeywords(a.title + ' ' + a.description);
        const matches = articleKeywords.filter(word => currentKeywords.includes(word));
        return { ...a, matchCount: matches.length };
      })
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 3);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>Đang tải bài viết...</Typography>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h4">Bài viết không tồn tại.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {article.title}
      </Typography>

      {article.urlToImage && (
        <Box mb={3}>
          <img
            src={article.urlToImage}
            alt={article.title}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Box>
      )}

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {new Date(article.publishedAt).toLocaleDateString()} - {article.author || 'Tác giả ẩn danh'}
      </Typography>

      <Typography variant="body1" paragraph>
        {article.content || article.description}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        <Link href={article.url} target="_blank" rel="noopener noreferrer">
          Đọc bài trên trang gốc
        </Link>
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Bài viết liên quan
      </Typography>

      <Grid container spacing={2}>
        {relatedArticles.map((relatedArticle) => (
          <Grid item xs={12} sm={4} key={relatedArticle.url}>
            <Box
              sx={{
                borderRadius: 2,
                boxShadow: 4,
                overflow: 'hidden',
                transition: '0.3s',
                '&:hover': { boxShadow: 8, transform: 'translateY(-5px)' },
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/news/${encodeURIComponent(relatedArticle.url)}`)}
            >
              <img
                src={relatedArticle.urlToImage}
                alt={relatedArticle.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  {new Date(relatedArticle.publishedAt).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, minHeight: 60 }} noWrap>
                  {relatedArticle.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {relatedArticle.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsDetail;
