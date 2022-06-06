import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function StandartImageList() {
    return (
        <ImageList
            sx={{ width: 900, height: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
            {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {
        img: 'https://i.ibb.co/bXnYr22/image.png',
        title: 'LifeChanger',
        rows: 3,
        cols: 3,
    },


];