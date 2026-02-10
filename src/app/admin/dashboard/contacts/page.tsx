import { db } from "@/lib/db";
import { Container, Card, CardContent } from "@/components/ui";
import { Mail, Calendar, DollarSign, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const contacts = await db.customServiceRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const stats = {
    total: contacts.length,
    pending: contacts.filter((c) => c.status === "pending").length,
    contacted: contacts.filter((c) => c.status === "contacted").length,
    completed: contacts.filter((c) => c.status === "completed").length,
  };

  return (
    <Container>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/admin/dashboard"
            className="text-gray-500 hover:text-black transition-colors"
          >
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-black">Contacts</span>
        </div>
        <h1 className="heading-caps text-4xl mb-2">Custom Service Requests</h1>
        <p className="text-gray-600">Manage customer inquiries and deals</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-black mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600 uppercase font-bold">
              Total Requests
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-black mb-1 text-orange-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600 uppercase font-bold">
              Pending
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-black mb-1 text-blue-600">
              {stats.contacted}
            </div>
            <div className="text-sm text-gray-600 uppercase font-bold">
              Contacted
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-black mb-1 text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600 uppercase font-bold">
              Completed
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="mx-auto mb-4 text-gray-300" size={48} />
              <p className="text-gray-500 text-lg mb-2">No requests yet</p>
              <p className="text-gray-400 text-sm">
                Custom service requests will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card key={contact.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-black mb-1">{contact.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} />
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-black underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold uppercase ${
                        contact.status === "pending"
                          ? "bg-orange-100 text-orange-900"
                          : contact.status === "contacted"
                          ? "bg-blue-100 text-blue-900"
                          : contact.status === "completed"
                          ? "bg-green-100 text-green-900"
                          : "bg-red-100 text-red-900"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare size={14} className="text-gray-400" />
                    <span className="font-bold">Service:</span>
                    <span className="text-gray-600">{contact.serviceType}</span>
                  </div>
                  {contact.budget && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={14} className="text-gray-400" />
                      <span className="font-bold">Budget:</span>
                      <span className="text-gray-600">{contact.budget}</span>
                    </div>
                  )}
                  {contact.timeline && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={14} className="text-gray-400" />
                      <span className="font-bold">Timeline:</span>
                      <span className="text-gray-600">{contact.timeline}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-sm font-bold mb-2 uppercase">
                    Project Details:
                  </div>
                  <div className="bg-gray-50 p-4 border-l-4 border-black text-sm text-gray-700 whitespace-pre-wrap">
                    {contact.message}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} />
                    <span>
                      Submitted on{" "}
                      {new Date(contact.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">ID: {contact.id}</div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
}
