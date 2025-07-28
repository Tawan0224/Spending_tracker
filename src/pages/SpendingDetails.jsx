import Navbar from "../components/Navbar";
import useSpendingDataStorage from "../components/SpendData";
import { useParams, useNavigate } from "react-router-dom";

export default function SpendingItemDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [spendingData] = useSpendingDataStorage();

    const index = parseInt(id, 10);
    const item = spendingData[index];

    if (!item) {
        return (
            <div className="container py-5">
                <h2>Spending not found</h2>
                <p>We couldn't find a spending item with ID <strong>{id}</strong>.</p>
                <button onClick={() => navigate(-1)} className="btn btn-secondary">Go Back</button>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h2 className="mb-4">🧾 Spending Detail</h2>
                <div className="card p-4 shadow-lg rounded-4">
                    <p><strong>Date:</strong> {item.date || 'Unknown'}</p>
                    <p><strong>Amount:</strong> ${item.amount}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Note:</strong> {item.note || '—'}</p>
                </div>

                <div className="mt-5">
                    <h4>📊 Spending</h4>
                    <div className="bg-info text-white p-3 rounded">💸 You spent ${item.amount} on {item.category}!</div>
                </div>

                <button onClick={() => navigate(-1)} className="btn btn-outline-primary mt-4">
                    🔙 Back to List
                </button>
            </div>
        </>
    );
}
