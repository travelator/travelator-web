import PropTypes from 'prop-types';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import BoltIcon from '@mui/icons-material/Bolt';
import modalConfig from './config';
import './RegenerateModal.css';

export default function RegenerateModal({
    open,
    handleClose,
    handleRegenerate,
    configKey,
}) {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        if (feedback.trim()) {
            handleRegenerate(feedback);
        }
    };

    const config = modalConfig[configKey];

    if (!config) {
        return <></>;
    }

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
                        {config.title}
                    </Typography>
                </Box>

                {/* Body section */}
                <Box className="modal-body">
                    <TextField
                        id="feedback"
                        label={config.feedbackLabel}
                        multiline
                        rows={4}
                        fullWidth
                        required
                        placeholder={config.feedbackPlaceholder}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        margin="normal"
                    />
                    <Typography
                        variant="body2"
                        className="modal-feedback-label"
                    >
                        {config.feedbackDescription}
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
                            {config.buttonText}
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
    configKey: PropTypes.string.isRequired,
};
