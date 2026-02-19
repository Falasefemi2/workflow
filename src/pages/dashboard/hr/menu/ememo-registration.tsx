import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Bold,
  Calendar,
  Image as ImageIcon,
  Italic,
  Link2,
  Paperclip,
  Plus,
  Smile,
  Underline,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMenuBasePath } from "../../shared/use-menu-base-path";

type Step = 1 | 2 | 3;

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  file?: File;
}

const redButtonClassName =
  "bg-primary text-white hover:bg-primary/90 rounded-sm px-10";

const initialDocuments: DocumentItem[] = [
  { id: "doc-1", name: "", description: "" },
];

export default function EMemoRegistrationPage() {
  const navigate = useNavigate();
  const menuBasePath = useMenuBasePath();
  const [step, setStep] = useState<Step>(1);
  const [memoTo, setMemoTo] = useState("");
  const [memoTitle, setMemoTitle] = useState("");
  const [memoNote, setMemoNote] = useState("");
  const [memoCode, setMemoCode] = useState("MC2023-749");
  const [department, setDepartment] = useState(
    "Business Transformation and processes",
  );
  const [amount, setAmount] = useState("");
  const [amountInWords, setAmountInWords] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [signatureUrl, setSignatureUrl] = useState("");
  const [signatureFileName, setSignatureFileName] = useState("");

  const formattedDate = useMemo(() => {
    if (!dateCreated) return "";
    const date = new Date(dateCreated);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }, [dateCreated]);

  const handleSignatureFileChange = (file: File | null) => {
    if (signatureUrl) {
      URL.revokeObjectURL(signatureUrl);
    }

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSignatureUrl(fileUrl);
      setSignatureFileName(file.name);
    } else {
      setSignatureUrl("");
      setSignatureFileName("");
    }
  };

  const handleSignatureSave = () => {
    if (!signatureUrl) {
      alert("Please upload signature");
      return;
    }
    setStep(2);
  };

  const handleAddDocument = () => {
    setDocuments((previous) => [
      ...previous,
      { id: `doc-${Date.now()}`, name: "", description: "" },
    ]);
  };

  const handleDocumentChange = (
    id: string,
    key: "name" | "description" | "file",
    value: string | File,
  ) => {
    setDocuments((previous) =>
      previous.map((doc) => {
        if (doc.id !== id) return doc;
        if (key === "file") {
          return { ...doc, file: value as File };
        }
        return { ...doc, [key]: value as string };
      }),
    );
  };

  const handleProceed = () => {
    if (!memoTo || !memoTitle || !memoNote || !dateCreated) {
      alert("Please fill in the required fields");
      return;
    }
    setStep(3);
  };

  const renderStepOne = () => (
    <div className="max-w-4xl">
      <div className="mt-10">
        <p className="text-xl font-semibold text-primary">Add Signature</p>
      </div>
      <div className="mt-6 flex w-full border border-dashed border-slate-400 rounded-sm overflow-hidden">
        <div className="flex-1 px-6 py-5 text-lg text-muted-foreground">
          {signatureFileName || "Upload signature"}
        </div>
        <input
          id="signature-file"
          type="file"
          className="hidden"
          onChange={(event) => {
            if (event.target.files?.[0]) {
              handleSignatureFileChange(event.target.files[0]);
            }
          }}
          accept=".png,.jpg,.jpeg,.svg"
        />
        <button
          type="button"
          onClick={() => document.getElementById("signature-file")?.click()}
          className="px-12 py-5 bg-secondary text-lg text-foreground/80 border-l border-border/40 hover:bg-secondary/80 transition-colors"
        >
          Browse file
        </button>
      </div>
      <Button
        type="button"
        onClick={handleSignatureSave}
        className={`mt-20 min-w-52 h-12 ${redButtonClassName}`}
      >
        Save
      </Button>
    </div>
  );

  const renderStepTwo = () => (
    <div className="max-w-5xl space-y-6">
      <div className="space-y-2">
        <p className="text-lg font-semibold">Memo To</p>
        <Input
          value={memoTo}
          onChange={(event) => setMemoTo(event.target.value)}
          placeholder="Enter here"
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <p className="text-lg font-semibold">Memo title</p>
        <Input
          value={memoTitle}
          onChange={(event) => setMemoTitle(event.target.value)}
          placeholder="--Input memo title--"
          className="h-12"
        />
      </div>

      <div className="bg-primary/80 text-foreground px-6 py-4 font-semibold text-2xl">
        E-Memo Note
      </div>

      <div className="border border-border rounded-md overflow-hidden">
        <div className="flex items-center gap-3 px-3 py-3 border-b border-border bg-muted/20 text-foreground/70">
          <span className="rounded-sm bg-primary w-5 h-5" />
          <span>Body 1</span>
          <span>|</span>
          <Bold className="w-4 h-4" />
          <Italic className="w-4 h-4" />
          <Underline className="w-4 h-4" />
          <span>|</span>
          <Paperclip className="w-4 h-4" />
          <Link2 className="w-4 h-4" />
          <ImageIcon className="w-4 h-4" />
          <Smile className="w-4 h-4" />
        </div>
        <Textarea
          value={memoNote}
          onChange={(event) => setMemoNote(event.target.value)}
          className="min-h-40 border-0 rounded-none focus-visible:ring-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <p className="text-lg font-semibold">Memo code</p>
          <Input
            value={memoCode}
            onChange={(event) => setMemoCode(event.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold">Department</p>
          <Input
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold">Amount</p>
          <Input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="--Input amount--"
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold">Amount in words</p>
          <Input
            value={amountInWords}
            onChange={(event) => setAmountInWords(event.target.value)}
            placeholder="--Input amount in words--"
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold">Beneficiary</p>
          <Input
            value={beneficiary}
            onChange={(event) => setBeneficiary(event.target.value)}
            placeholder="--Input beneficiary--"
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold">Date Created</p>
          <div className="relative">
            <Input
              type="date"
              value={dateCreated}
              onChange={(event) => setDateCreated(event.target.value)}
              className="h-12 pr-10"
            />
            <Calendar className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between">
          <p className="text-primary font-extrabold text-2xl">DOCUMENT(S)</p>
          <Button
            type="button"
            onClick={handleAddDocument}
            className="bg-zinc-600 hover:bg-zinc-700 text-white rounded-sm px-6"
          >
            <Plus className="w-4 h-4" />
            Add more document
          </Button>
        </div>
      </div>

      {documents.map((doc) => (
        <div key={doc.id} className="space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Document Name</p>
            <Input
              value={doc.name}
              onChange={(event) =>
                handleDocumentChange(doc.id, "name", event.target.value)
              }
              placeholder="--Input document name--"
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold">Document Description</p>
            <Textarea
              value={doc.description}
              onChange={(event) =>
                handleDocumentChange(doc.id, "description", event.target.value)
              }
              placeholder="Write a short description of the document"
              className="min-h-28"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold">Upload File</p>
            <div className="flex w-full border border-dashed border-slate-400 rounded-sm overflow-hidden">
              <div className="flex-1 px-6 py-4 text-muted-foreground">
                {doc.file?.name || "Choose file to upload"}
              </div>
              <input
                id={`memo-document-${doc.id}`}
                type="file"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files?.[0]) {
                    handleDocumentChange(doc.id, "file", event.target.files[0]);
                  }
                }}
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById(`memo-document-${doc.id}`)?.click()
                }
                className="px-10 py-4 bg-secondary text-foreground/80 border-l border-border/40 hover:bg-secondary/80 transition-colors"
              >
                Browse file
              </button>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={handleProceed}
        className={`mt-8 min-w-52 h-12 ${redButtonClassName}`}
      >
        Proceed
      </Button>
    </div>
  );

  const renderStepThree = () => (
    <div className="max-w-6xl">
      <div className="text-center pt-10 pb-8 border-b border-border/30">
        <p className="text-2xl font-bold">INTERNAL MEMORANDUM</p>
        <p className="mt-6 text-2xl">
          Dated : <span className="font-semibold">{formattedDate}</span>
        </p>
      </div>

      <div className="pt-10 space-y-4 text-2xl border-b border-border/30 pb-8">
        <p>
          <span className="font-semibold">To:</span> {memoTo || "---"}
        </p>
        <p>
          <span className="font-semibold">From:</span> Dagbalagba@vatebra.com
        </p>
        <p>
          <span className="font-semibold">Department:</span>{" "}
          {department || "---"}
        </p>
        <p>
          <span className="font-semibold">Subject:</span> {memoTitle || "---"}
        </p>
      </div>

      <div className="py-16 text-2xl">
        <p className="uppercase whitespace-pre-wrap">
          {memoNote || "No memo note provided."}
        </p>
      </div>

      <div className="pb-14 border-b border-border/30">
        {signatureUrl ? (
          <img
            src={signatureUrl}
            alt="Signature"
            className="h-20 object-contain"
          />
        ) : (
          <p className="text-muted-foreground text-2xl">
            No signature uploaded
          </p>
        )}
        <p className="text-2xl mt-4">Agbalagba - Denis</p>
      </div>

      <div className="flex flex-wrap gap-4 pt-8">
        <Button
          type="button"
          onClick={() => window.print()}
          className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-sm min-w-64 h-12"
        >
          Print Memo
        </Button>
        <Button
          type="button"
          onClick={() => setStep(2)}
          className="bg-zinc-600 hover:bg-zinc-700 text-white rounded-sm min-w-64 h-12"
        >
          Edit memo
        </Button>
        <Button type="button" className={`min-w-64 h-12 ${redButtonClassName}`}>
          Submit For Approval
        </Button>
      </div>
    </div>
  );

  return (
    <div className="pb-12">
      <div className="border-b border-border/30">
        <div className="max-w-6xl px-6 py-4 flex items-center gap-8">
          <button
            type="button"
            onClick={() => navigate(menuBasePath)}
            className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
            <span className="text-lg font-medium text-primary">
              Return home
            </span>
          </button>
        </div>
      </div>

      <div className="px-6 pt-8">
        {step === 1
          ? renderStepOne()
          : step === 2
            ? renderStepTwo()
            : renderStepThree()}
      </div>
    </div>
  );
}
