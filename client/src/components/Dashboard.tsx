import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from '@material-ui/core'

type Card = {
  title: string
  description: number | string
  link: string
}

function Dashboard(): JSX.Element {
  const CARDS: Card[] = [
    {
      title: 'Users',
      description: 0,
      link: '/users',
    },
  ]

  return (
    <Container className="container">
      <h1>Dashboard</h1>
      <Grid container spacing={1}>
        {CARDS.map((item) => (
          <Grid item key={item.title} lg={12}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={RouterLink}
                  to={item.link}
                >
                  Go to {item.title}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

// type ReduxStateProps = {
//   orders: OrdersState['orders'];
//   clients: ClientsState['clients'];
//   services: ServicesState['services'];
//   languages: LanguagesState['languages'];
// };

// const mapStateToProps = ({
// }: RootState): ReduxStateProps => ({
// });

// const mapDispatchToProps = (dispatch: Dispatch<>) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default Dashboard

// type ReduxProps = ReturnType<typeof mapStateToProps> &
//   ReturnType<typeof mapDispatchToProps>;
