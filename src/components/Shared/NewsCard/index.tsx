import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewsCard = ({ article, onClick }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 4,
                borderRadius: 2,
                overflow: 'hidden',
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 8,
                    transform: 'translateY(-5px)',
                    cursor: 'pointer',
                },
            }}
            onClick={() => (onClick ? onClick() : navigate(`/news/${encodeURIComponent(article.url)}`))}
        >
            {article.urlToImage && (
                <CardMedia
                    component="img"
                    image={article.urlToImage}
                    alt={article.title}
                    height="200"
                />
            )}

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {new Date(article.publishedAt).toLocaleDateString()} - {article.source.name}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, minHeight: 60 }}>
                    {article.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        minHeight: 60,
                    }}
                >
                    {article.description}
                </Typography>
            </CardContent>

            <Box sx={{ px: 2, pb: 2 }}>
                <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        (onClick ? onClick() : navigate(`/news/${encodeURIComponent(article.url)}`))
                    }}
                >
                    Read Article
                </Button>
            </Box>
        </Card>
    );
};

export default NewsCard;
