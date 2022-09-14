import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './style.css';
import theme from '../../../theme';
import { Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import { TXN_STATE_VARIABLE } from 'src/variables/chatWidget';

const useStyless = makeStyles((theme) => ({
    root: {
        maxWidth: 371,
        minWidth: 371,
        borderRadius: '30px',
        display: 'inline-block',
        marginRight: '15px',

        '& .MuiCardContent-root': {
            paddingTop: 0
        },
        '& .MuiCardContent-root p': {
            fontSize: 10,
            fontWeight: 500
        }
    },
    sumHeading: {
        padding: '14px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '50%',
        padding: '5px',
        color: '#fff',
        width: '26px',
        height: '26px',
        fontSize: 'medium'
    },
    cardHeading: {
        paddingBottom: '0',
        '& .MuiCardHeader-avatar': {
            marginRight: '3px'
        },
        '& h4': {
            fontSize: '18px',
            fontWeight: '700'
        }
    },
    cardContent: {
        marginLeft: '26px'
    },
    stepperRoot: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    stepper: {
        padding: 0,
        '& .MuiStep-alternativeLabel': {
            minWidth: 70
        },
        '& .MuiStepLabel-root.MuiStepLabel-alternativeLabel': {
            marginTop: 15
        },
        '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
            marginTop: 3,
            fontSize: 10,
        },
        '& .MuiStep-alternativeLabel .MuiStepConnector-alternativeLabel': {
            top: 5,
            left: '-50%',
            right: '50%'
        }
    },
    quoteButton: {
        background: '#9439FF',
        width: 49,
        height: 19,
        fontSize: 10
    }
}));

const TxnState = ({ selectedTask, config, isEdit, openStatus, onFilterSaved }) => {
    const classes = useStyless()
    const [activeStep, setActiveStep] = React.useState(1);
    const steps = getSteps(config);

    useEffect(() => {
        getActiveStage()
    }, [selectedTask])

    const getActiveStage = () => {
        if (selectedTask && selectedTask.variables) {
            setActiveStep(0);
            Object.keys(selectedTask.variables).forEach(function (key) {
                if (key == TXN_STATE_VARIABLE) {
                    const index = steps.findIndex(stage => stage.id == selectedTask.variables[key]);
                    setActiveStep(index);
                }
                // if (variable.name == key) {
                //   variables.push({ name: key, title: variable.title, value: selectedTask.variables[key].value });
                // }
            });
        }

    }

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.cardHeading}
                avatar={
                    <Icon className={classes.avatar} color={theme.palette.background.white}>{config ? config.icon : 'star'}</Icon>
                }
                title={
                    <Typography variant="h4" id="title">
                        {config ? config.label : ''}
                        <Button variant="contained" className={classes.quoteButton} size="small" style={{ float: 'right' }} color="primary">
                            Quote
                        </Button>
                    </Typography>

                }
            />
            <CardContent>
                {/* <div className={classes.cardContent}>
                            <Grid container ml={2}>
                            {getVariables()}
                            </Grid>
                        </div> */}
                <div className={classes.stepperRoot}>
                    <Stepper className={classes.stepper} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                            <Step key={label.name}>
                                <StepLabel icon={<div className={'icon-wrap'} style={{ backgroundColor: label.color }}><Icon style={{ fontSize: '1rem' }}>{label.icon}</Icon></div>} StepIconComponent={ColorlibStepIcon}>{label.name}</StepLabel>
                                {/* <StepLabel  icon={<Icon>star</Icon>}>{label}</StepLabel> */}

                            </Step>
                        ))}
                    </Stepper>
                    {/* <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
            </Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Reset
            </Button>
                            </div>
                        ) : (
                                <div>
                                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                    <div>
                                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                            Back
              </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                    </div> */}
                </div>

            </CardContent>
        </Card>
    );
}

export default TxnState;

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 11,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        zIndex: 1,
        color: '#fff',
        width: 22,
        height: 22,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',

        '& .icon-wrap': {
            width: 22,
            height: 22,
            display: 'flex',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    active: {
        // backgroundImage:
        // 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        // boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        // backgroundImage:
        // 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
            style={{ backgroundColor: props.color }}
        >
            {props.icon}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node
};

function getSteps(config) {
    let steps = config? config.steps : [];
    let finalSteps = [];
    steps.map((step) => {
        finalSteps.push(step);
    })
    return finalSteps;
}