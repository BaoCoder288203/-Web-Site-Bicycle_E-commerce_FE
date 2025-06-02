import React from 'react';
import { Box, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Avatar } from '@mui/material';
import { MapPin, Mail, Phone, User, MessageSquare, ChevronDown } from 'lucide-react';

const Contact = () => {
  return (
    <Box sx={{width:'100%',py:4,display:'flex',flexDirection:'column',jusstifyContent:'center',alignItems:'center'}}>
      {/* Section 1: Contact Info */}
      <Grid sx={{width:'97%',py:9}} container spacing={4} justifyContent="center">
        {[
          {
            icon: <MapPin size={40} color="black"/>, title: 'Our Location',
            content: 'House #5, Street Number #98, brasilia-70000-000, Brazil'
          },
          {
            icon: <Mail size={40} color="black"/>, title: 'Email Address',
            content: (
              <>
                <Typography>Contact@cyclecity.com</Typography>
                <Typography>Support@cyclecitye.com</Typography>
              </>
            )
          },
          {
            icon: <Phone size={40} color="black"/>, title: 'Contact Number',
            content: (
              <>
                <Typography>Phone: (+55) 654-456-5417</Typography>
                <Typography>Mobile: (+01) 654-456-1234</Typography>
              </>
            )
          }
        ].map((item, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card  sx={{ textAlign: 'center', py: 9,px:6 }}>
              <Avatar sx={{ bgcolor: '#f6faf6', m: 'auto', mb: 2 }}>{item.icon}</Avatar>
              <Typography variant="h5" fontWeight="bold">{item.title}</Typography>
              <Typography mt={1}>{item.content}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Section 2: Contact Form */}
      <Grid sx={{width:'97%'}} container spacing={4} alignItems="center" mt={6}>
        <Grid item xs={12} md={6}>
          <img
            src="public/assets/images/contact-banner.png"
            alt="Biker"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight="bold">Let's Connect</Typography>
          <Typography variant="body2" mb={2}>
            Feel free to adjust the description to include specific contact details such as email address, phone number, and physical address as needed.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="Name" InputProps={{ startAdornment: <User size={18} style={{ marginRight: 8 }} /> }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth placeholder="Email Address" InputProps={{ startAdornment: <Mail size={18} style={{ marginRight: 8 }} /> }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth placeholder="Phone Number" InputProps={{ startAdornment: <Phone size={18} style={{ marginRight: 8 }} /> }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="Message" multiline minRows={4} />
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Checkbox />}
            label={<Typography variant="body2">I have by agree to the <a href="#">Terms & Conditions</a> of Cyclecity</Typography>}
          />
          <Button variant="contained" sx={{ mt: 2, backgroundColor: '#e74c3c' }}>
            Submit Now
          </Button>
        </Grid>
      </Grid>

      {/* Section 3: FAQ */}
      <Box sx={{width:'97%'}} mt={8}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
          FREQUENTLY ASKED QUESTIONS
        </Typography>
        {[
          {
            q: 'What types of bicycles do you offer?',
            a: ''
          },
          {
            q: 'Do you provide bike fitting services?',
            a: 'The custom bike build process can take anywhere from a few weeks to a couple of months, depending on the complexity and availability of components.'
          },
          {
            q: 'Can I test ride a bike before purchasing?',
            a: ''
          },
          {
            q: 'Do you offer repair and maintenance services?',
            a: ''
          },
          {
            q: 'How do I choose the right size bike?',
            a: ''
          },
          {
            q: 'Do you sell bike parts and accessories?',
            a: ''
          },
          {
            q: 'Are there any warranties on the bikes?',
            a: ''
          },
          {
            q: 'Can I order a bike online and pick it up in-store?',
            a: ''
          }
        ].map((item, index) => (
          <Accordion key={index} defaultExpanded={item.a !== ''}>
            <AccordionSummary expandIcon={<ChevronDown size={20} />}>
              <Typography fontWeight="bold">Q: {item.q}</Typography>
            </AccordionSummary>
            {item.a && (
              <AccordionDetails>
                <Typography variant="body2">A: {item.a}</Typography>
              </AccordionDetails>
            )}
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default Contact;
