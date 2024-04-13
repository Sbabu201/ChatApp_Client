import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { StoryCarazoul } from './StoryCarazoul';

export default function StoryCard({ open, story, handleStoryOpen }) {

    const [slide, setSlide] = React.useState(0);

    const nextSlide = () => {
        setSlide(slide === story.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? story.length - 1 : slide - 1);
    };
    React.useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 3000); // 30 seconds

        // Clear the interval on component unmount
        return () => clearInterval(slideInterval);
    }, [slide]);
    const [layout, setLayout] = React.useState('fullscreen');
    return (
        <React.Fragment>
            <Stack direction="row" spacing={1}>

            </Stack>
            <Modal open={open} onClose={() => handleStoryOpen()}>
                <ModalDialog style={{ backgroundColor: 'black' }} layout={layout}>
                    <ModalClose />
                    <DialogTitle>SoumyaGram</DialogTitle>
                    <DialogContent>
                        <div className='w-full h-full flex justify-center items-center '>
                            <div className=' relative w-[90%] h-[95%] flex gap-4 items-center justify-center overflow-x-auto '>

                                <div className="carousel">
                                    {/* <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" /> */}
                                    {story.map((item, idx) => {
                                        return (
                                            <img
                                                src={item.content}
                                                alt={item.alt}
                                                key={idx}
                                                className={slide === idx ? "slide " : "slide slide-hidden"}
                                            />
                                        );
                                    })}
                                    {/* <BsArrowRightCircleFill
                                        onClick={nextSlide}
                                        className="arrow arrow-right"
                                    /> */}
                                    <span className="indicators">
                                        {story.map((_, idx) => {
                                            return (
                                                <button
                                                    key={idx}
                                                    className={
                                                        slide === idx ? "indicator" : "indicator indicator-inactive"
                                                    }
                                                    onClick={() => setSlide(idx)}
                                                ></button>
                                            );
                                        })}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}