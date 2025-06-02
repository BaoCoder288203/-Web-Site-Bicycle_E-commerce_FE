import React from 'react';
import Carousel, { Modal, ModalGateway as ModalGatewayOriginal } from 'react-images';
import { GalleryPhoto } from '@/pages/Admin/Product';

// Create a properly typed version of ModalGateway
const ModalGateway = (props: { children: React.ReactNode }) => (
    <ModalGatewayOriginal {...props as any} />
);

interface ImageLightboxProps {
    isOpen: boolean;
    currentImage: number;
    photos: GalleryPhoto[];
    closeLightbox: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ isOpen, currentImage, photos, closeLightbox }) => {
    return (
        <ModalGateway>
            {isOpen ? (
                <Modal onClose={closeLightbox}>
                    <Carousel
                        currentIndex={currentImage}
                        views={photos.map((photo) => ({ source: photo.src }))}
                    />
                </Modal>
            ) : null}
        </ModalGateway>
    );
};

export default ImageLightbox;