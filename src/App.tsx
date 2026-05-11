/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { LawFirmSite } from './components/LawFirmSite';

export default function App() {
  return (
    <LanguageProvider>
      <LawFirmSite />
    </LanguageProvider>
  );
}

