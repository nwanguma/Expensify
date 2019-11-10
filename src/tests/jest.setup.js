import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('dotenv').config({ path: '.env.test' });
configure({ adapter: new Adapter() });