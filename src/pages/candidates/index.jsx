import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Divider, List, ListItemButton, ListItemText, ListSubheader, Paper, Tooltip } from '@mui/material'

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

const CandidatesList = ({ onSelectCandidate, candidate }) => {
    const candidates = useSelector(state => state.candidates)

    return (
        <List
            {...commonProps}
            subheader={<SubHeader text={'candidates'} />}
        >
            {candidates ? candidates.map(({ applicationId, name, id }) => {
                return (
                    <Tooltip key={id} title={applicationId ? name : "Candidate doesn't have uploaded any video yet"}>
                        <ListItemButton key={id} /* disabled={!applicationId} */ onClick={() => onSelectCandidate(applicationId)} selected={candidate === applicationId}>
                            <ListItemText primary={name} />
                        </ListItemButton>
                    </Tooltip>
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

            {questions ? questions.map(({ id, question }) => {
                return (
                    <ListItemButton key={id} onClick={() => onSelectQuestion(id)} selected={selectedQuestion === id}>
                        <ListItemText primary={question} />
                    </ListItemButton>
                )
            }) : null}

        </List >
    )

}

const CandidatePreview = ({ candidate: candidateId, question: questionId }) => {
    const applications = useSelector(state => state.applications)
    const selectedCandidate = applications.find(application => application.id === candidateId)
    const videoOfSelectedQuestion = selectedCandidate?.videos.find(video => video.questionId === questionId)

    return (
        <Paper elevation={3} style={{ height: '100%' }}>
            {videoOfSelectedQuestion ?
                <>
                    <div>Video: {videoOfSelectedQuestion?.src}</div>
                    <div>Comment: {videoOfSelectedQuestion?.comments} </div>
                </> : <p>No video selected</p>
            }
        </Paper>
    )

}


export const Candidates = () => {
    const [candidate, setCandidate] = useState(null)
    const [question, setQuestion] = useState(null)
    const applications = useSelector(state => state.applications)
    const questions = useSelector(state => state.questions)



    return (<main>
        <header>EMBED RECRUITMENT CANDIDATES</header>
        <section style={{ display: 'flex' }}>
            <nav style={{ width: 200, height: '100vh' }}>
                <CandidatesList onSelectCandidate={setCandidate} candidate={candidate} />
                <Divider />
                {!!candidate ? <QuestionsList onSelectQuestion={setQuestion} question={question} /> : null}
            </nav>
            <div style={{ width: 'calc(100% - 200px)', padding: 20 }}>
                <CandidatePreview question={question} candidate={candidate} />
            </div>
        </section>
    </main>)
}