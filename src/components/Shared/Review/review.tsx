import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const ReviewCard = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: 2,
        maxWidth: 600,
      }}
    >
      <Box display={"flex"} margin="normal" sx={{ pb: 2 }}>
        <Rating value={5} readOnly size="small" sx={{ color: "black" }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginLeft: "auto" }}
        >
          1 day ago
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src="/user.jpg" alt="User" sx={{ width: 48, height: 48 }} />
        <Box>
          <Typography fontWeight="bold" color="black">
            Angelina Jolie
          </Typography>
        </Box>
      </Box>
      <Box textAlign={"left"}>
        <Typography fontWeight="bold" sx={{ mt: 1 }} color="black">
          Gorgeous and stylish.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          I rarely leave reviews. So many of you do it so much better. But— this
          sweater right here is my favorite Umino item. My closet is almost
          exclusively Umino and Eileen but this sweater is so deliciously soft,
          warm, and the boxiness is perfect. Only thing I don't like is that it
          sheds a little bit. Can't be walking around like that at this adult
          age 😆 but I keep a roller in my desk.
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewCard;
