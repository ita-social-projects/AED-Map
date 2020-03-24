import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  GridList,
  GridListTile
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { hidePopup } from '../../../actions/popupDisplay';
import { createImage } from '../../../../Sidebar/api';
import UploadImage from '../../../../../shared/UploadImage';
import useAlert from '../../../../../shared/Alert/useAlert';

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

const ModalPhotoContent = ({
  images,
  handleClose,
  hidePopup,
  id
}) => {
  const classes = useStyles();
  const [, ShowAlert] = useAlert();
  const handleImageSend = async bodyFormData => {
    try {
      await createImage(bodyFormData, id);
      handleClose();
      hidePopup();
      ShowAlert({
        open: true,
        severity: 'success',
        message: 'Фотографії успішно додані'
      });
    } catch (error) {
      ShowAlert({
        open: true,
        severity: 'error',
        message:
          'Тимчасова серверна помилка. Спробуйте ще раз.'
      });
    }
  };
  return (
    <UploadImage
      handleImageSend={handleImageSend}
      handleClose={handleClose}
    >
      <Container className={classes.root} maxWidth="md">
        {images.length > 0 ? (
          <GridList
            cellHeight={180}
            className={classes.gridList}
          >
            <GridListTile
              key="Subheader"
              cols={2}
              style={{ height: 'auto' }}
            >
              <Typography variant="h5">
                Усі фотографії
              </Typography>
            </GridListTile>
            {images.map(image => (
              <GridListTile key={image.id}>
                <img
                  src={`http://localhost:3012/api/images/${image.filename}`}
                  alt={image.filename}
                />
              </GridListTile>
            ))}
          </GridList>
        ) : (
          <Typography variant="h5">
            Поки немає фотографій
          </Typography>
        )}
      </Container>
    </UploadImage>
  );
};

ModalPhotoContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.string,
      filename: PropTypes.string
    })
  ).isRequired,
  id: PropTypes.string.isRequired
};

export default connect(
  state => ({
    id: state.defs.active
  }),
  dispatch => ({ hidePopup: () => dispatch(hidePopup()) })
)(ModalPhotoContent);
