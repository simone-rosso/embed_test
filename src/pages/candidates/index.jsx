import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Snackbar,
    TextField,
    Button,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Card,
    CardMedia,
    CardHeader,
    CardActions,
    CardContent,
    Typography,
    Alert
} from '@mui/material'

import './styles.css'

// useParams would be a to-do, to take the uri from a link 
// and use the params to match a specific video
import { useParams } from 'react-router'

const commonProps = {
    sx: {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        '& ul': {
            padding: 0
        },
    },
    style: {
        height: '49%',
        overflowY: 'scroll'
    }
}

const SubHeader = ({ text }) => <ListSubheader>{text}</ListSubheader>

const CandidatesList = ({ onSelectCandidate, candidate: candidateProps }) => {
    const candidates = useSelector(state => state.candidates)

    return (
        <List
            {...commonProps}
            subheader={<SubHeader text={'candidates'} />}
        >
            {candidates ? candidates.map((candidate) => {
                return (
                    <ListItemButton
                        key={candidate.id}
                        onClick={() => onSelectCandidate(candidate)}
                        selected={candidate === candidateProps}
                    >
                        <ListItemText primary={candidate.name} />
                    </ListItemButton>
                )
            }) : null}

        </List>
    )
}

const QuestionsList = ({ onSelectQuestion, question: selectedQuestion }) => {
    const questions = useSelector(state => state.questions)

    return (
        <List
            {...commonProps}
            subheader={<SubHeader text={'questions'} />}
        >

            {questions ? questions.map((q) => {
                return (
                    <ListItemButton
                        key={q.id}
                        onClick={() => onSelectQuestion(q)}
                        selected={selectedQuestion === q}
                    >
                        <ListItemText primary={q.question} />
                    </ListItemButton>
                )
            }) : null}

        </List >
    )

}

const CandidatePreview = ({ candidate, question }) => {
    const [open, setOpen] = useState(false);
    const applications = useSelector(state => state.applications)

    const application = applications.find(a => a.id === candidate.applicationId)
    const videoOfSelectedQuestion = application.videos.find(video => video.questionId === question.id)

    const [comment, setComment] = useState(videoOfSelectedQuestion?.comments)

    function updateApplication(application) {
        fetch(`http://localhost:3010/applications/${application.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(application),
        })
            .then((response) => response.json())
            .then(() => {
                setOpen(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            {!!videoOfSelectedQuestion
                ? <>
                    <CardHeader
                        title={candidate.name}
                        subheader={`on: ${question.question}`}
                    />
                    <CardMedia
                        alt={question.question}
                        height="100%"
                        style={{ maxHeight: 300 }}
                        image={videoOfSelectedQuestion.src}
                        component='video'
                        autoPlay
                    />
                    <CardContent>
                        <TextField
                            id="filled-multiline-flexible"
                            label="Comments:"
                            multiline
                            value={comment}
                            maxRows={4}
                            variant="standard"
                            onChange={(e) => setComment(e.target.value)}
                            fullWidth
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => updateApplication({
                                ...application, videos: application.videos.map(v => {
                                    if (v.questionId !== question.id) return v
                                    return { ...v, comments: comment }
                                })
                            })}
                        >
                            Save
                        </Button>
                    </CardActions>
                </>
                : <Typography className='card-text'>
                    {candidate.name} hasn't uploaded a video for this question yet
                </Typography>
            }
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success">Application succesfully updated</Alert>
            </Snackbar>
        </>
    )
}

const DEFAULT_CANDIDATE = { name: null, id: null, applicationId: null }
const DEFAULT_QUESTION = { id: null, question: null }

export const Candidates = () => {
    const [candidate, setCandidate] = useState(DEFAULT_CANDIDATE)
    const [question, setQuestion] = useState(DEFAULT_QUESTION)

    const onSelectCandidate = (selectedCandidate) => {
        setCandidate(selectedCandidate)
        setQuestion(DEFAULT_QUESTION)
    }

    return (<main>
        <header>
            <Typography variant='h5'>
                Embed Recruitmend Candidates
            </Typography>
        </header>
        <section style={{ display: 'flex' }}>
            <nav style={{ width: 200, height: '100vh' }}>
                <CandidatesList onSelectCandidate={onSelectCandidate} candidate={candidate} />
                <Divider />
                {!!candidate.applicationId
                    ? <QuestionsList
                        onSelectQuestion={setQuestion}
                        question={question}
                    />
                    : null}

            </nav>
            <div style={{ width: 'calc(100% - 200px)', padding: 20 }}>
                <Card elevation={3}>
                    {
                        !!candidate.id && !!candidate.applicationId ?
                            !!question.id
                                ? <CandidatePreview question={question} candidate={candidate} />
                                : <Typography className='card-text'>Select a question from the list</Typography>
                            : candidate.id
                                ? <Typography className='card-text'>
                                    {candidate.name} has not uploaded a video application yet
                                </Typography>
                                : null
                    }
                </Card>
            </div>
        </section>
    </main>)
}