ALTER TABLE "workspace_engineering_work_history"
  ADD CONSTRAINT "workspace_engineering_work_history_work_id_unique"
  UNIQUE ("engineering_work_id", "id");
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work_history"
  ADD CONSTRAINT "workspace_engineering_work_history_same_work_basis_fk"
  FOREIGN KEY ("engineering_work_id", "based_on_event_id")
  REFERENCES "public"."workspace_engineering_work_history"("engineering_work_id", "id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work_defect_revisions"
  ADD CONSTRAINT "workspace_engineering_work_defect_revisions_same_work_event_fk"
  FOREIGN KEY ("engineering_work_id", "history_event_id")
  REFERENCES "public"."workspace_engineering_work_history"("engineering_work_id", "id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
