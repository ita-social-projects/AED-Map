import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  GridList,
  GridListTile,
  GridListTileBar,
  Container
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { UploadButton } from '../Fields';
import permissionService from '../../modules/Auth/permissionService';
import { ADD_IMAGES } from '../../modules/MapHolder/consts';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imgPreview: {
    width: '100%',
    maxWidth: 300
  },
  addBtn: {
    marginTop: 10,
    marginBottom: 10
  },
  gridList: {
    width: 600,
    height: 300
  }
});
const uniqueArray = (arr, prop) => [
  ...new Map(arr.map(item => [item[prop], item])).values()
];

const UploadImage = ({
  handleImageSend,
  children,
  user,
  defItemInfo
}) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [
    permissionForAddImages,
    changePermissionForAddImages
  ] = useState(false);
  useEffect(() => {
    const permissionToAddImages = permissionService(
      ADD_IMAGES,
      user,
      defItemInfo
    );
    changePermissionForAddImages(permissionToAddImages);
  }, [user, defItemInfo]);

  const handleUpload = event => {
    const files = [...event.target.files];
    if (!files.length) return;
    setImages(prevImages =>
      uniqueArray([...prevImages, ...files], 'name')
    );
  };
  const removeImage = name => {
    setImages(prevImages =>
      prevImages.filter(image => image.name !== name)
    );
  };

  const sendImages = () => {
    const bodyFormData = new FormData();
    images.forEach(image =>
      bodyFormData.append('images', image)
    );
    handleImageSend(bodyFormData);
    setImages([]);
  };

  return (
    <Container className={classes.root} maxWidth="md">
      {images.length > 0 ? (
        <>
          <GridList
            cellHeight={240}
            className={classes.gridList}
          >
            <GridListTile
              key="Subheader"
              cols={2}
              style={{ height: 'auto' }}
            >
              <Typography variant="h5">
                Вибрані фотографії
              </Typography>
            </GridListTile>
            {images.map(image => {
              const src = URL.createObjectURL(image);
              const { name } = image;
              return (
                <GridListTile key={name}>
                  <img
                    src={src}
                    alt={name}
                    className={classes.imgPreview}
                    title="Подвійний клік видаляє фото"
                    onDoubleClick={() => removeImage(name)}
                  />

                  <GridListTileBar title={name} />
                </GridListTile>
              );
            })}
          </GridList>
          <Button
            className={classes.addBtn}
            variant="contained"
            color="primary"
            onClick={sendImages}
          >
            Загрузити фото
          </Button>
          <Typography component="h3">
            {`Загружено ${images.length} фото`}
          </Typography>
        </>
      ) : (
        <>{children}</>
      )}
      {permissionForAddImages && (
        <UploadButton
          htmlFor="add-photo"
          handleUpload={handleUpload}
        >
          {images.length > 0
            ? 'Добавити ще одне фото'
            : 'Добавити фото'}
        </UploadButton>
      )}
    </Container>
  );
};

UploadImage.defaultProps = {
  handleImageSend: () => {},
  children: '',
  user: null,
  defItemInfo: {}
};

UploadImage.propTypes = {
  handleImageSend: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  defItemInfo: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    location: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number)
    }),
    actual_date: PropTypes.string,
    floor: PropTypes.number,
    storage_place: PropTypes.string,
    accessibility: PropTypes.string,
    language: PropTypes.string,
    informational_plates: PropTypes.string,
    phone: PropTypes.arrayOf(PropTypes.string),
    additional_information: PropTypes.string
  })
};

export default connect(state => ({
  user: state.user.user,
  defItemInfo: state.defs.mapData.find(
    def => def._id === state.defs.active
  )
}))(UploadImage);
