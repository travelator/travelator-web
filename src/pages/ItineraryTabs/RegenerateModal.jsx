import PropTypes from 'prop-types';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import BoltIcon from '@mui/icons-material/Bolt';
import './RegenerateModal.css';

export default function RegenerateModal({
    open,
    handleClose,
    handleRegenerate,
}) {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        if (feedback.trim()) {
            handleRegenerate(feedback);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className="modal-box">
                {/* Header section */}
                <Box className="modal-header">
                    <Typography
                        id="modal-title"
                        className="modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Regenerate Itinerary
                    </Typography>
                </Box>

                {/* Body section */}
                <Box className="modal-body">
                    <TextField
                        id="feedback"
                        label="Feedback"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        placeholder="Itinerary feedback concerning e.g. timing, activity selection, number of activities, start and end point."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        margin="normal"
                    />
                    <Typography
                        variant="body2"
                        className="modal-feedback-label"
                    >
                        Provide feedback on how you would like your itinerary to
                        be changed.
                    </Typography>
                    <Box className="modal-footer">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            startIcon={<BoltIcon />}
                            className="modal-button"
                            id="regenerate-button"
                        >
                            Regenerate
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

RegenerateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleRegenerate: PropTypes.func.isRequired,
};
