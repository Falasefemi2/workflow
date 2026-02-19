import { useState } from "react";
import {
  mockDocuments,
  mockReadmeList,
  type Document,
  type ReadmeItem,
} from "@/components/mockData";

export function useDocumentsAndReadmeManagement() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [readmeList, setReadmeList] = useState<ReadmeItem[]>(mockReadmeList);

  const handleMarkAsRead = (documentId: string, isDocument: boolean) => {
    if (isDocument) {
      setDocuments(
        documents.map((doc) =>
          doc.id === documentId ? { ...doc, marked: !doc.marked } : doc,
        ),
      );
    } else {
      setReadmeList(
        readmeList.map((item) =>
          item.id === documentId ? { ...item, marked: !item.marked } : item,
        ),
      );
    }
  };

  const handleDownload = (document: Document) => {
    if (document.downloadable && document.filePath) {
      // Simulate download
      const link = window.document.createElement("a");
      link.href = document.filePath;
      link.download = `${document.title}.pdf`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      console.log(`Downloaded: ${document.title}`);
    }
  };

  return {
    // State
    documents,
    readmeList,
    // Handlers
    handleMarkAsRead,
    handleDownload,
  };
}
