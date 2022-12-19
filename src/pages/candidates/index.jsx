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
    Typography
} from '@mui/material'


// useParams would be a to-do, to take the uri from a link and use the params to match a specific video
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

function updateApplication(application) {
    const value = fetch('http://localhost:3010/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
                    <ListItemButton key={candidate.id} onClick={() => onSelectCandidate(candidate)} selected={candidate === candidateProps}>
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
                    <ListItemButton key={q.id} onClick={() => onSelectQuestion(q)} selected={selectedQuestion === q}>
                        <ListItemText primary={q.question} />
                    </ListItemButton>
                )
            }) : null}

        </List >
    )

}

const CandidatePreview = ({ candidate, question }) => {
    const applications = useSelector(state => state.applications)
    const application = applications.find(a => a.id === candidate.applicationId)
    const videoOfSelectedQuestion = application.videos.find(video => video.questionId === question.id)

    const [comment, setComment] = useState(videoOfSelectedQuestion?.comments)

    /*    const getSubheader = () =>{
           return (
   
           )
       } */

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
                        <Button size="small" color="primary">
                            Save
                        </Button>
                    </CardActions>
                </>
                : <Typography>The candidate haven't uploaded a video for this question yet</Typography>}
        </>
    )
}

const DEFAULT_CANDIDATE = { name: null, id: null, applicationId: null }
const DEFAULT_QUESTION = { id: null, question: null }
export const Candidates = () => {
    const [candidate, setCandidate] = useState(DEFAULT_CANDIDATE)
    const [question, setQuestion] = useState(DEFAULT_QUESTION)
    const [open, setOpen] = useState(false);

    const onSelectCandidate = (selectedCandidate) => {
        setCandidate(selectedCandidate)
        setQuestion(DEFAULT_QUESTION)
    }

    return (<main>
        <header>EMBED RECRUITMENT CANDIDATES</header>
        <section style={{ display: 'flex' }}>
            <nav style={{ width: 200, height: '100vh' }}>
                <CandidatesList onSelectCandidate={onSelectCandidate} candidate={candidate} />
                <Divider />
                {!!candidate.applicationId ? <QuestionsList onSelectQuestion={setQuestion} question={question} /> : null}

            </nav>
            <div style={{ width: 'calc(100% - 200px)', padding: 20 }}>
                <Card elevation={3}>
                    {
                        !!candidate.id && !!candidate.applicationId ?
                            !!question.id
                                ? <CandidatePreview question={question} candidate={candidate} />
                                : <Typography>Select a question from the list</Typography>
                            : candidate.id ? <Typography>The candidate has not uploaded a video application yet</Typography>
                                : null
                    }
                </Card>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Note archived"
                    action={action}
                />
            </div>
        </section>
    </main>)
}