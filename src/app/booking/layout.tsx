import styles from './booking.module.css'

export default function BookingPLayout({ children }: LayoutProps<"/booking">) {
    return (
        <div className={styles.sectionlayout}>
            {children}
        </div>
    );
}
