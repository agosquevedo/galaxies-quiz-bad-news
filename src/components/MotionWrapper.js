'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const MotionH1 = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return <motion.h1 ref={ref} {...rest}>{children}</motion.h1>;
});

export const MotionP = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return <motion.p ref={ref} {...rest}>{children}</motion.p>;
});

export const MotionDiv = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return <motion.div ref={ref} {...rest}>{children}</motion.div>;
});

MotionH1.displayName = 'MotionH1';
MotionP.displayName = 'MotionP';
MotionDiv.displayName = 'MotionDiv';