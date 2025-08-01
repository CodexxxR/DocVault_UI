import { useEffect, useState } from "react";
import { userManager } from "../auth/AuthService";
import LoginHeader from "../components/LoginHeader";
import NavBar from "../components/NavBar";
import '../styles/dashboard.css';
import { getUserRoles } from "../utils/getUserRoles";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineEdit, MdInfoOutline } from "react-icons/md";
import { mockDocuments } from "../assets/mocks/documents";
import AddDocModal from "../components/AddDocModal";
import RecentActivity from "../components/RecentActivity";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';


const Dashboard = () => {
    const [user, setUser] = useState<any>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    // const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("title");
    const [filterQuery, setFilterQuery] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    useEffect(() => {
        userManager.getUser().then(loadedUser => {
            setUser(loadedUser);
        });
        console.log(getUserRoles(user));
    }, []);
    
    const roles = user ? getUserRoles(user) : [];
    const isAdmin = roles.includes("ADMIN");
    
    const handleLogoutClick = () => {
        userManager.signoutRedirect({
            post_logout_redirect_uri: 'http://localhost:5173/login'
        });
    }

    const filteredDocuments = mockDocuments.filter(doc => {
        if (doc.adminOnly === "true" && !isAdmin) return false;
        switch (filterType) {
            case "title":
                return doc.title.toLowerCase().includes(filterQuery.toLowerCase());
            case "uploadedBy":
                return doc.uploadedBy.toLowerCase().includes(filterQuery.toLowerCase());
            case "docType":
                return doc.docType.toLowerCase() === filterQuery.toLowerCase();
            case "dateRange":
                const uploadedDate = new Date(doc.uploadedAt);
                const from = dateFrom ? new Date(dateFrom) : null;
                const to = dateTo ? new Date(dateTo) : null;
                return (!from || uploadedDate >= from) && (!to || uploadedDate <= to);
            case "tags":
                return doc.tags.some(tag =>
                    tag.toLowerCase().includes(filterQuery.toLowerCase())
                );
            default:
                return true;
        }
    });

    const handleAddDocument = (formData: FormData) => {
        const uploadedBy = user?.profile?.preferred_username || "unknown";
        const uploadedAt = new Date().toISOString();
        const file = formData.get("file") as File;

        const fileName = file?.name || "";
        const extensionMatch = fileName.match(/\.(\w+)$/);
        const docType = extensionMatch ? extensionMatch[1].toLowerCase() : "unknown";

        const newDoc = {
            title: formData.get("title") as string,
            tags: (formData.get("tags") as string).split(",").map(tag => tag.trim()),
            file,
            docType,
            uploadedBy,
            uploadedAt,
            adminOnly: formData.get("adminOnly") === "true"
        };
        //for now dooing console.log later will do post call
        console.log("Uploaded Document:", newDoc);
    };

    const handleEdit = (doc: any) => {
        console.log(doc);
    };

    const handleDelete = (docId: any) => {
        console.log(docId);
    }

    return(
        <div className="dashboard-page">
            <div className="dashboard-header">
                <LoginHeader />
                <button className="logout-button" onClick={handleLogoutClick}>Log-Out</button>
            </div>
            <div className="dashboard-body">
                <NavBar currentUserRole={isAdmin ? "ADMIN" : "ALL_USERS"} />
                <div className="dashboard-main">
                    <div className="dashboard-grid">
                        <div className="doc-search-filter">
                            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="filter-select">
                                <option value="title">Title</option>
                                <option value="uploadedBy">Uploaded By</option>
                                <option value="docType">Document Type</option>
                                <option value="dateRange">Date Range</option>
                                <option value="tags">Tags</option>
                            </select>

                            {filterType === "tags" ? (
                                <input
                                    type="text"
                                    className="filter-search"
                                    placeholder="Enter tag (e.g., invoice, legal)"
                                    value={filterQuery}
                                    onChange={e => setFilterQuery(e.target.value)}
                                />
                            ) : filterType === "dateRange" ? (
                                <div className="date-range-inputs">
                                    <input
                                        type="date"
                                        style={{height:"30px"}}
                                        value={dateFrom}
                                        onChange={e => setDateFrom(e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        value={dateTo}
                                        onChange={e => setDateTo(e.target.value)}
                                    />
                                </div>
                            ) : filterType === "docType" ? (
                                <select
                                    value={filterQuery}
                                    onChange={e => setFilterQuery(e.target.value)}
                                >
                                    <option value="">All</option>
                                    <option value="pdf">PDF</option>
                                    <option value="txt">TXT</option>
                                    <option value="img">IMG</option>
                                    <option value="png">PNG</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    className="filter-search"
                                    placeholder={`Search by ${filterType}`}
                                    value={filterQuery}
                                    onChange={e => setFilterQuery(e.target.value)}
                                />
                            )}
                        </div>
                        <div className="new-doc-btn">
                            <button className="add-btn" onClick={() => setModalOpen(true)}>
                                <FaPlus /> 
                                <span className="add-btn-txt">Add Document</span>
                            </button>
                            <span><MdInfoOutline size={20} data-tooltip-id="my-tooltip" data-tooltip-content="To add Document with preview of the file, Use the preview menu-item" /></span>
                            <Tooltip 
                                id="my-tooltip"
                                place="right"
                                style={{ backgroundColor: "rgba(108, 108, 255, 0.77)", color: "#fff", borderRadius: '4px', fontSize: '12px' }}
                            />
                        </div>
                        <AddDocModal
                            isOpen={isModalOpen}
                            onClose={() => setModalOpen(false)}
                            onSubmit={handleAddDocument}
                        />
                        <div className="document-cards">
                            {filteredDocuments.length > 0 ? (
                                filteredDocuments.map(doc => (
                                    <div key={doc.id} className="document-card">
                                        <div className="doc-header">
                                            <h3>{doc.title}</h3>
                                            <div className="doc-card-actions">
                                                <button className="edit-btn" onClick={() => handleEdit(doc)}>
                                                    <MdOutlineEdit size={20} />
                                                </button>
                                                <button className="delete-btn" onClick={() => handleDelete(doc.id)}>
                                                    <MdDeleteOutline size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="doc-uploadedBy"><strong>Uploaded By:</strong> {doc.uploadedBy}</p>
                                        <p className="doc-type"><strong>Document Type:</strong> {doc.docType}</p>
                                        <p><strong>Date:</strong> {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                                        <div className="tags">
                                            {doc.tags.map((tag, index) => (
                                                <span key={index} className="document-tag">{tag}</span>
                                            ))}
                                        </div>
                                        
                                    </div>
                                ))
                            ) : (
                                <div>No documents found.</div>
                            )}
                        </div>
                    </div>
                    <div className="activity-bar">
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;