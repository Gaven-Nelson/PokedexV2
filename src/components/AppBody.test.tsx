import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'nsw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import fetch from '../fetch';

const server = setupServer(
rest.get('/greeting')