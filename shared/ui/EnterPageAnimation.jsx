import { motion } from "framer-motion";

export default function EnterPageAnimation({ children }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {children}
        </motion.div>
    );
}
