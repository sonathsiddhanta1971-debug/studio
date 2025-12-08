
"use client";

import { PrivateRoute } from "@/components/private-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStore } from "@/contexts/store-context";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BannerForm } from "@/components/admin/banner-form";
import type { Banner } from "@/lib/types";

function BannersAdminPageContent() {
  const { banners } = useStore();
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | undefined>(undefined);

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
        <Card>
          <CardHeader>
            <CardTitle>Banners</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map(banner => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <Image src={banner.imageUrl} alt={banner.title} width={120} height={40} className="rounded-md object-cover" />
                    </TableCell>
                    <TableCell className="font-medium">{banner.title}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(banner)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
          </DialogHeader>
          <BannerForm banner={editingBanner} onSave={() => setFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function BannersAdminPage() {
    return (
        <PrivateRoute>
            <BannersAdminPageContent />
        </PrivateRoute>
    )
}
