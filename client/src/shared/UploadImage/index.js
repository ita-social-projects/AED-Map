import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  GridList,
  GridListTile,
  GridListTileBar
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { UploadButton } from '../Fields';

const useStyles = makeStyles({
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
    height: 400
  }
});

const UploadImage = ({
  handleImageSend,
  children,
  handleClose
}) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const handleUpload = event => {
    const fileReader = new FileReader();

    const file = event.target.files[0];
    if (!file) return;
    const name = file.name.replace(/\.\w+/, '');

    fileReader.onload = ({ target: { result } }) => {
      if (!result) return;
      setImages(prevImages => [
        ...prevImages.filter(image => image.name !== name),
        {
          name,
          src: result,
          _id: name
        }
      ]);
    };
    fileReader.readAsDataURL(file);
  };
  const removeImage = id => {
    setImages(prevImages =>
      prevImages.filter(image => image._id !== id)
    );
  };

  const sendImages = () => {
    handleImageSend(images);
    handleClose();
  };

  return (
    <>
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
            />
            {images.map(({ name, src, _id }) => (
              <GridListTile key={_id}>
                <img
                  src={src}
                  alt={name}
                  className={classes.imgPreview}
                  title="Подвійний клік видаляє фото"
                  onDoubleClick={() => removeImage(_id)}
                />

                <GridListTileBar title={name} />
              </GridListTile>
            ))}
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
      <UploadButton
        htmlFor="add-photo"
        handleUpload={handleUpload}
      >
        {images.length > 0
          ? 'Добавити ще одне фото'
          : 'Добавити фото'}
      </UploadButton>
    </>
  );
};

UploadImage.defaultProps = {
  handleImageSend: () => {},
  handleClose: () => {},
  children: ''
};

UploadImage.propTypes = {
  handleImageSend: PropTypes.func,
  handleClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

export default UploadImage;
