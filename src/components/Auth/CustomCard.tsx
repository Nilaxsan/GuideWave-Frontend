import {
    Container,
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
  } from "@mui/material";
  
  interface CustomCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
  }
  
  const CustomCard: React.FC<CustomCardProps> = ({
    title,
    description,
    icon,
    children,
  }) => (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", py: 5 ,mt: 5}}
    >
      <Card
        sx={{ width: "100%", maxWidth: 400, p: 3, boxShadow: 3, borderRadius: 5 }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom >
            {title}
          </Typography>
          {icon && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 70,
                  height: 70,
                }}
              >
                {icon}
              </Avatar>
            </Box>
          )}
          <Typography variant="body1"  sx={{ mb: 3 }}>
            {description}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Container>
  );
  
  export default CustomCard;
  