import { motion } from 'framer-motion';

interface GiftCardProps {
  imageSrc: string;
  imageAlt: string;
  onClick: () => void;
  delay: number;
}

export function GiftCard({ imageSrc, imageAlt, onClick, delay }: GiftCardProps) {
  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-40 h-40 md:w-56 md:h-56 bg-[#c75b5b] rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-32 h-32 md:w-44 md:h-44 object-contain"
      />
    </motion.button>
  );
}
