/**
 * @typedef {number} Constant
 */
const VERSION = '0.2.2';
let SUCCESS = 1;
let FAILURE = 2;
let RUNNING = 3;
let ERROR = 4;
const COMPOSITE = 'composite';
const DECORATOR = 'decorator';
const ACTION = 'action';
const CONDITION = 'condition';

if(process.env.NODE_ENV === 'development'){
    SUCCESS = 'SUCCESS';
    FAILURE = 'FAILURE';
    RUNNING = 'RUNNING';
    ERROR = 'ERROR';
}

module.exports = {
    VERSION,
    SUCCESS,
    FAILURE,
    RUNNING,
    ERROR,
    COMPOSITE,
    DECORATOR,
    ACTION,
    CONDITION
};
