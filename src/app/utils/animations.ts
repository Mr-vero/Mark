export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  }
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}; 