import React, { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NewsCard from '../NewsCard';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_KEY_API_NEWS;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=cycling&apiKey=${apiKey}`
        );
        const data = await res.json();
        setArticles(data.articles.slice(0, 9));
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>Đang tải tin tức...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 9 }}>
      <Grid container sx={{ py: 5 }} spacing={4}>
        {articles.map((article, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <NewsCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default News;
