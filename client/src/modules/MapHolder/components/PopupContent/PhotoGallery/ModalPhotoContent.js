import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import UploadImage from '../../../../../shared/UploadImage';
// import { photos } from '../../../../../mocks';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 600,
    height: 550
  }
}));

const ModalPhotoContent = ({ images, handleClose  }) => {
  const classes = useStyles();

  const handleImageSend = images => {
    // works with images
    // eslint-disable-next-line
    console.log('[Go to the server]', images);
  };
  return (
    <UploadImage
      handleImageSend={handleImageSend}
      handleClose={handleClose}
    >
      <Container className={classes.root} maxWidth="md">
        <GridList
          cellHeight={180}
          className={classes.gridList}
        >
          <GridListTile
            key="Subheader"
            cols={2}
            style={{ height: 'auto' }}
          >
            <ListSubheader component="div">
              Усі фотографії
            </ListSubheader>
          </GridListTile>
          {images.map(image => (
            <GridListTile key={image.id}>
              <img src={`http://localhost:3012/api/images/${image.filename}`} alt={image.filename} />
              <GridListTileBar title={image.filename} />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </UploadImage>
  );
};

ModalPhotoContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    filename: PropTypes.string
  })).isRequired
};

export default ModalPhotoContent;
