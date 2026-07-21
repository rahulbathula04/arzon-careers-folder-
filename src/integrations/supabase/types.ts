export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      admin_invites: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          deleted_by: string | null;
          email: string;
          expires_at: string;
          id: string;
          invited_by: string | null;
          role: Database["public"]["Enums"]["app_role"];
          token: string;
          used_at: string | null;
          used_by: string | null;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email: string;
          expires_at?: string;
          id?: string;
          invited_by?: string | null;
          role: Database["public"]["Enums"]["app_role"];
          token: string;
          used_at?: string | null;
          used_by?: string | null;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email?: string;
          expires_at?: string;
          id?: string;
          invited_by?: string | null;
          role?: Database["public"]["Enums"]["app_role"];
          token?: string;
          used_at?: string | null;
          used_by?: string | null;
        };
        Relationships: [];
      };
      ai_feedback: {
        Row: {
          created_at: string;
          id: string;
          note: string | null;
          reason: string;
          resolution_note: string | null;
          resolved_at: string | null;
          resolved_by: string | null;
          route: string;
          surface: string | null;
          user_agent: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          note?: string | null;
          reason: string;
          resolution_note?: string | null;
          resolved_at?: string | null;
          resolved_by?: string | null;
          route: string;
          surface?: string | null;
          user_agent?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          note?: string | null;
          reason?: string;
          resolution_note?: string | null;
          resolved_at?: string | null;
          resolved_by?: string | null;
          route?: string;
          surface?: string | null;
          user_agent?: string | null;
        };
        Relationships: [];
      };
      analytics_alert_config: {
        Row: {
          created_at: string;
          enabled: boolean;
          event_name: string;
          min_count: number;
          notes: string | null;
          required_props: string[];
          updated_at: string;
          window_hours: number;
        };
        Insert: {
          created_at?: string;
          enabled?: boolean;
          event_name: string;
          min_count?: number;
          notes?: string | null;
          required_props?: string[];
          updated_at?: string;
          window_hours?: number;
        };
        Update: {
          created_at?: string;
          enabled?: boolean;
          event_name?: string;
          min_count?: number;
          notes?: string | null;
          required_props?: string[];
          updated_at?: string;
          window_hours?: number;
        };
        Relationships: [];
      };
      analytics_alerts: {
        Row: {
          alert_type: string;
          details: Json;
          event_name: string;
          fired_at: string;
          id: string;
          notified_at: string | null;
          resolved_at: string | null;
        };
        Insert: {
          alert_type: string;
          details?: Json;
          event_name: string;
          fired_at?: string;
          id?: string;
          notified_at?: string | null;
          resolved_at?: string | null;
        };
        Update: {
          alert_type?: string;
          details?: Json;
          event_name?: string;
          fired_at?: string;
          id?: string;
          notified_at?: string | null;
          resolved_at?: string | null;
        };
        Relationships: [];
      };
      analytics_events: {
        Row: {
          anon_id: string | null;
          application_id: string | null;
          cohort: string | null;
          created_at: string;
          event_name: string;
          id: string;
          ip_hash: string | null;
          lead_id: string | null;
          path: string | null;
          program_slug: string | null;
          props: Json;
          referrer: string | null;
          session_id: string | null;
          user_agent: string | null;
          user_id: string | null;
          utm_source: string | null;
        };
        Insert: {
          anon_id?: string | null;
          application_id?: string | null;
          cohort?: string | null;
          created_at?: string;
          event_name: string;
          id?: string;
          ip_hash?: string | null;
          lead_id?: string | null;
          path?: string | null;
          program_slug?: string | null;
          props?: Json;
          referrer?: string | null;
          session_id?: string | null;
          user_agent?: string | null;
          user_id?: string | null;
          utm_source?: string | null;
        };
        Update: {
          anon_id?: string | null;
          application_id?: string | null;
          cohort?: string | null;
          created_at?: string;
          event_name?: string;
          id?: string;
          ip_hash?: string | null;
          lead_id?: string | null;
          path?: string | null;
          program_slug?: string | null;
          props?: Json;
          referrer?: string | null;
          session_id?: string | null;
          user_agent?: string | null;
          user_id?: string | null;
          utm_source?: string | null;
        };
        Relationships: [];
      };
      application_events: {
        Row: {
          actor_id: string | null;
          application_id: string;
          created_at: string;
          event_type: string;
          from_status: Database["public"]["Enums"]["application_status"] | null;
          id: string;
          note: string | null;
          to_status: Database["public"]["Enums"]["application_status"] | null;
        };
        Insert: {
          actor_id?: string | null;
          application_id: string;
          created_at?: string;
          event_type: string;
          from_status?: Database["public"]["Enums"]["application_status"] | null;
          id?: string;
          note?: string | null;
          to_status?: Database["public"]["Enums"]["application_status"] | null;
        };
        Update: {
          actor_id?: string | null;
          application_id?: string;
          created_at?: string;
          event_type?: string;
          from_status?: Database["public"]["Enums"]["application_status"] | null;
          id?: string;
          note?: string | null;
          to_status?: Database["public"]["Enums"]["application_status"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "application_events_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "applications";
            referencedColumns: ["id"];
          },
        ];
      };
      applications: {
        Row: {
          assigned_to: string | null;
          created_at: string;
          deleted_at: string | null;
          deleted_by: string | null;
          email: string;
          id: string;
          lead_id: string | null;
          name: string;
          notes: string | null;
          phone: string;
          program_name: string | null;
          program_slug: string;
          status: Database["public"]["Enums"]["application_status"];
          updated_at: string;
          user_agent: string | null;
          utm_source: string | null;
          whatsapp_optin: boolean;
        };
        Insert: {
          assigned_to?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email: string;
          id?: string;
          lead_id?: string | null;
          name: string;
          notes?: string | null;
          phone: string;
          program_name?: string | null;
          program_slug: string;
          status?: Database["public"]["Enums"]["application_status"];
          updated_at?: string;
          user_agent?: string | null;
          utm_source?: string | null;
          whatsapp_optin?: boolean;
        };
        Update: {
          assigned_to?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email?: string;
          id?: string;
          lead_id?: string | null;
          name?: string;
          notes?: string | null;
          phone?: string;
          program_name?: string | null;
          program_slug?: string;
          status?: Database["public"]["Enums"]["application_status"];
          updated_at?: string;
          user_agent?: string | null;
          utm_source?: string | null;
          whatsapp_optin?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "applications_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "career_engine_leads";
            referencedColumns: ["id"];
          },
        ];
      };
      artifact_requests: {
        Row: {
          candidate_ref: string;
          created_at: string;
          expires_at: string;
          id: string;
          jd_task: string;
          message: string | null;
          recruiter_email: string;
          recruiter_org: string;
          status: string;
          token: string;
        };
        Insert: {
          candidate_ref: string;
          created_at?: string;
          expires_at: string;
          id?: string;
          jd_task: string;
          message?: string | null;
          recruiter_email: string;
          recruiter_org: string;
          status?: string;
          token: string;
        };
        Update: {
          candidate_ref?: string;
          created_at?: string;
          expires_at?: string;
          id?: string;
          jd_task?: string;
          message?: string | null;
          recruiter_email?: string;
          recruiter_org?: string;
          status?: string;
          token?: string;
        };
        Relationships: [];
      };
      arzonprime60_waitlist: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          deleted_by: string | null;
          email: string;
          id: string;
          intent_id: string | null;
          lead_id: string | null;
          name: string | null;
          notified_at: string | null;
          phone: string | null;
          reason: string;
          session_id: string | null;
          source: string | null;
          tier: string | null;
          user_agent: string | null;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email: string;
          id?: string;
          intent_id?: string | null;
          lead_id?: string | null;
          name?: string | null;
          notified_at?: string | null;
          phone?: string | null;
          reason?: string;
          session_id?: string | null;
          source?: string | null;
          tier?: string | null;
          user_agent?: string | null;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email?: string;
          id?: string;
          intent_id?: string | null;
          lead_id?: string | null;
          name?: string | null;
          notified_at?: string | null;
          phone?: string | null;
          reason?: string;
          session_id?: string | null;
          source?: string | null;
          tier?: string | null;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "arzonprime60_waitlist_intent_id_fkey";
            columns: ["intent_id"];
            isOneToOne: false;
            referencedRelation: "enrolment_intents";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "arzonprime60_waitlist_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "career_engine_leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "arzonprime60_waitlist_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "career_engine_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      assessment_shares: {
        Row: {
          acri_overall: number;
          archetype: string;
          archetype_name: string;
          band_label: string | null;
          conversions: number;
          created_at: string;
          id: string;
          payload: Json;
          referral_code: string | null;
          slug: string;
          top_track_slug: string | null;
          top_track_title: string | null;
          views: number;
        };
        Insert: {
          acri_overall?: number;
          archetype: string;
          archetype_name: string;
          band_label?: string | null;
          conversions?: number;
          created_at?: string;
          id?: string;
          payload?: Json;
          referral_code?: string | null;
          slug: string;
          top_track_slug?: string | null;
          top_track_title?: string | null;
          views?: number;
        };
        Update: {
          acri_overall?: number;
          archetype?: string;
          archetype_name?: string;
          band_label?: string | null;
          conversions?: number;
          created_at?: string;
          id?: string;
          payload?: Json;
          referral_code?: string | null;
          slug?: string;
          top_track_slug?: string | null;
          top_track_title?: string | null;
          views?: number;
        };
        Relationships: [];
      };
      audit_log: {
        Row: {
          action: string;
          actor_id: string | null;
          diff: Json;
          id: string;
          occurred_at: string;
          record_id: string;
          table_name: string;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          diff?: Json;
          id?: string;
          occurred_at?: string;
          record_id: string;
          table_name: string;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          diff?: Json;
          id?: string;
          occurred_at?: string;
          record_id?: string;
          table_name?: string;
        };
        Relationships: [];
      };
      backup_runs: {
        Row: {
          bytes: number;
          destination: string | null;
          details: Json;
          error: string | null;
          finished_at: string | null;
          id: string;
          notified_at: string | null;
          row_count: number;
          started_at: string;
          status: string;
          table_count: number;
        };
        Insert: {
          bytes?: number;
          destination?: string | null;
          details?: Json;
          error?: string | null;
          finished_at?: string | null;
          id?: string;
          notified_at?: string | null;
          row_count?: number;
          started_at?: string;
          status?: string;
          table_count?: number;
        };
        Update: {
          bytes?: number;
          destination?: string | null;
          details?: Json;
          error?: string | null;
          finished_at?: string | null;
          id?: string;
          notified_at?: string | null;
          row_count?: number;
          started_at?: string;
          status?: string;
          table_count?: number;
        };
        Relationships: [];
      };
      briefing_requests: {
        Row: {
          audience: string;
          consent_at: string | null;
          consent_given: boolean;
          contact_name: string;
          created_at: string;
          domain: string | null;
          id: string;
          org_name: string;
          role: string | null;
          source: string | null;
          user_agent: string | null;
          work_email: string;
          year: string | null;
        };
        Insert: {
          audience: string;
          consent_at?: string | null;
          consent_given?: boolean;
          contact_name: string;
          created_at?: string;
          domain?: string | null;
          id?: string;
          org_name: string;
          role?: string | null;
          source?: string | null;
          user_agent?: string | null;
          work_email: string;
          year?: string | null;
        };
        Update: {
          audience?: string;
          consent_at?: string | null;
          consent_given?: boolean;
          contact_name?: string;
          created_at?: string;
          domain?: string | null;
          id?: string;
          org_name?: string;
          role?: string | null;
          source?: string | null;
          user_agent?: string | null;
          work_email?: string;
          year?: string | null;
        };
        Relationships: [];
      };
      career_engine_answers: {
        Row: {
          answer: string;
          asked_at: string;
          id: string;
          question_id: string;
          session_id: string;
        };
        Insert: {
          answer: string;
          asked_at?: string;
          id?: string;
          question_id: string;
          session_id: string;
        };
        Update: {
          answer?: string;
          asked_at?: string;
          id?: string;
          question_id?: string;
          session_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "career_engine_answers_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "career_engine_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      career_engine_leads: {
        Row: {
          archetype: string | null;
          cohort_id: string | null;
          contacted_at: string | null;
          contacted_by: string | null;
          created_at: string;
          deleted_at: string | null;
          deleted_by: string | null;
          email: string;
          fit_score: number | null;
          id: string;
          name: string;
          phone: string;
          result_payload: Json | null;
          session_id: string;
          top_paths: Json | null;
          whatsapp_optin: boolean;
        };
        Insert: {
          archetype?: string | null;
          cohort_id?: string | null;
          contacted_at?: string | null;
          contacted_by?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email: string;
          fit_score?: number | null;
          id?: string;
          name: string;
          phone: string;
          result_payload?: Json | null;
          session_id: string;
          top_paths?: Json | null;
          whatsapp_optin?: boolean;
        };
        Update: {
          archetype?: string | null;
          cohort_id?: string | null;
          contacted_at?: string | null;
          contacted_by?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email?: string;
          fit_score?: number | null;
          id?: string;
          name?: string;
          phone?: string;
          result_payload?: Json | null;
          session_id?: string;
          top_paths?: Json | null;
          whatsapp_optin?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "career_engine_leads_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: true;
            referencedRelation: "career_engine_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      career_engine_sessions: {
        Row: {
          completed_at: string | null;
          device: string | null;
          id: string;
          session_token: string;
          started_at: string;
          stream: string | null;
          user_agent: string | null;
          utm_source: string | null;
        };
        Insert: {
          completed_at?: string | null;
          device?: string | null;
          id?: string;
          session_token?: string;
          started_at?: string;
          stream?: string | null;
          user_agent?: string | null;
          utm_source?: string | null;
        };
        Update: {
          completed_at?: string | null;
          device?: string | null;
          id?: string;
          session_token?: string;
          started_at?: string;
          stream?: string | null;
          user_agent?: string | null;
          utm_source?: string | null;
        };
        Relationships: [];
      };
      ce_percentile_snapshots: {
        Row: {
          cdf: number[];
          dimension: string;
          refreshed_at: string;
          sample_size: number;
          stream: string;
        };
        Insert: {
          cdf: number[];
          dimension: string;
          refreshed_at?: string;
          sample_size: number;
          stream: string;
        };
        Update: {
          cdf?: number[];
          dimension?: string;
          refreshed_at?: string;
          sample_size?: number;
          stream?: string;
        };
        Relationships: [];
      };
      ce_rate_buckets: {
        Row: {
          count: number;
          key: string;
          window_start: string;
        };
        Insert: {
          count?: number;
          key: string;
          window_start?: string;
        };
        Update: {
          count?: number;
          key?: string;
          window_start?: string;
        };
        Relationships: [];
      };
      certificates: {
        Row: {
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          deleted_by: string | null;
          description: string | null;
          id: string;
          image_url: string | null;
          is_published: boolean;
          issuer: string;
          pdf_url: string | null;
          sort_order: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          is_published?: boolean;
          issuer: string;
          pdf_url?: string | null;
          sort_order?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          deleted_by?: string | null;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          is_published?: boolean;
          issuer?: string;
          pdf_url?: string | null;
          sort_order?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      changelog_entries: {
        Row: {
          area: string;
          body: string | null;
          created_at: string;
          id: string;
          released_on: string;
          title: string;
        };
        Insert: {
          area: string;
          body?: string | null;
          created_at?: string;
          id?: string;
          released_on: string;
          title: string;
        };
        Update: {
          area?: string;
          body?: string | null;
          created_at?: string;
          id?: string;
          released_on?: string;
          title?: string;
        };
        Relationships: [];
      };
      cohort_audit_log: {
        Row: {
          action: string;
          actor_id: string | null;
          after: Json | null;
          before: Json | null;
          cohort_id: string;
          id: string;
          occurred_at: string;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          after?: Json | null;
          before?: Json | null;
          cohort_id: string;
          id?: string;
          occurred_at?: string;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          after?: Json | null;
          before?: Json | null;
          cohort_id?: string;
          id?: string;
          occurred_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cohort_audit_log_cohort_id_fkey";
            columns: ["cohort_id"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
        ];
      };
      cohorts: {
        Row: {
          created_at: string;
          display_label: string;
          id: string;
          is_locked: boolean;
          lock_at: string;
          lock_reason: string | null;
          seats_cap: number;
          seats_taken: number;
          starts_at: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_label: string;
          id: string;
          is_locked?: boolean;
          lock_at: string;
          lock_reason?: string | null;
          seats_cap: number;
          seats_taken?: number;
          starts_at: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_label?: string;
          id?: string;
          is_locked?: boolean;
          lock_at?: string;
          lock_reason?: string | null;
          seats_cap?: number;
          seats_taken?: number;
          starts_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      content_qa_reviews: {
        Row: {
          bucket: string;
          created_at: string;
          id: string;
          notes: string | null;
          page: string;
          reviewer_id: string | null;
          section_id: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          bucket: string;
          created_at?: string;
          id?: string;
          notes?: string | null;
          page: string;
          reviewer_id?: string | null;
          section_id: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          bucket?: string;
          created_at?: string;
          id?: string;
          notes?: string | null;
          page?: string;
          reviewer_id?: string | null;
          section_id?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      counsellor_leads: {
        Row: {
          contact: string;
          contact_type: string;
          contacted_at: string | null;
          contacted_by: string | null;
          created_at: string;
          deleted_at: string | null;
          deleted_by: string | null;
          id: string;
          name: string;
          recovery_attempts: Json;
          requested_role: string | null;
          requested_slot_at: string | null;
          source: string | null;
          user_agent: string | null;
        };
        Insert: {
          contact: string;
          contact_type: string;
          contacted_at?: string | null;
          contacted_by?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          name: string;
          recovery_attempts?: Json;
          requested_role?: string | null;
          requested_slot_at?: string | null;
          source?: string | null;
          user_agent?: string | null;
        };
        Update: {
          contact?: string;
          contact_type?: string;
          contacted_at?: string | null;
          contacted_by?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          name?: string;
          recovery_attempts?: Json;
          requested_role?: string | null;
          requested_slot_at?: string | null;
          source?: string | null;
          user_agent?: string | null;
        };
        Relationships: [];
      };
      coupon_tier_prices: {
        Row: {
          code: string;
          override_price_inr: number;
          tier: string;
        };
        Insert: {
          code: string;
          override_price_inr: number;
          tier: string;
        };
        Update: {
          code?: string;
          override_price_inr?: number;
          tier?: string;
        };
        Relationships: [
          {
            foreignKeyName: "coupon_tier_prices_code_fkey";
            columns: ["code"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "coupon_tier_prices_code_fkey";
            columns: ["code"];
            isOneToOne: false;
            referencedRelation: "v_active_promotions";
            referencedColumns: ["code"];
          },
        ];
      };
      coupons: {
        Row: {
          attribution_id: string | null;
          campaign_id: string | null;
          code: string;
          created_at: string;
          discount_pct: number;
          is_active: boolean;
          max_uses_per_email: number;
          window_minutes: number;
        };
        Insert: {
          attribution_id?: string | null;
          campaign_id?: string | null;
          code: string;
          created_at?: string;
          discount_pct: number;
          is_active?: boolean;
          max_uses_per_email?: number;
          window_minutes?: number;
        };
        Update: {
          attribution_id?: string | null;
          campaign_id?: string | null;
          code?: string;
          created_at?: string;
          discount_pct?: number;
          is_active?: boolean;
          max_uses_per_email?: number;
          window_minutes?: number;
        };
        Relationships: [
          {
            foreignKeyName: "coupons_attribution_id_fkey";
            columns: ["attribution_id"];
            isOneToOne: false;
            referencedRelation: "promotion_attributions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coupons_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "promotion_campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "coupons_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "v_active_promotions";
            referencedColumns: ["campaign_id"];
          },
        ];
      };
      course_thumbnail_overrides: {
        Row: {
          deleted_at: string | null;
          deleted_by: string | null;
          image_url: string;
          slug: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          deleted_at?: string | null;
          deleted_by?: string | null;
          image_url: string;
          slug: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          deleted_at?: string | null;
          deleted_by?: string | null;
          image_url?: string;
          slug?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      demand_milestones: {
        Row: {
          completed_at: string | null;
          created_at: string;
          id: string;
          label: string;
          order_index: number;
          status: Database["public"]["Enums"]["demand_milestone_status"];
          track_id: string;
          updated_at: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          label: string;
          order_index?: number;
          status?: Database["public"]["Enums"]["demand_milestone_status"];
          track_id: string;
          updated_at?: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          label?: string;
          order_index?: number;
          status?: Database["public"]["Enums"]["demand_milestone_status"];
          track_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "demand_milestones_track_id_fkey";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "demand_tracks";
            referencedColumns: ["id"];
          },
        ];
      };
      demand_partners: {
        Row: {
          confirmed_at: string | null;
          created_at: string;
          id: string;
          logo_url: string | null;
          name: string;
          track_id: string;
          type: Database["public"]["Enums"]["demand_partner_type"];
        };
        Insert: {
          confirmed_at?: string | null;
          created_at?: string;
          id?: string;
          logo_url?: string | null;
          name: string;
          track_id: string;
          type: Database["public"]["Enums"]["demand_partner_type"];
        };
        Update: {
          confirmed_at?: string | null;
          created_at?: string;
          id?: string;
          logo_url?: string | null;
          name?: string;
          track_id?: string;
          type?: Database["public"]["Enums"]["demand_partner_type"];
        };
        Relationships: [
          {
            foreignKeyName: "demand_partners_track_id_fkey";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "demand_tracks";
            referencedColumns: ["id"];
          },
        ];
      };
      demand_tracks: {
        Row: {
          build_started_at: string | null;
          category: string;
          created_at: string;
          eta_days: number;
          founding_cap: number;
          founding_filled: number;
          id: string;
          launch_eta: string | null;
          live_course_slug: string | null;
          pitch: string | null;
          slug: string;
          status: Database["public"]["Enums"]["demand_track_status"];
          title: string;
          updated_at: string;
          vote_threshold: number;
          votes_count: number;
        };
        Insert: {
          build_started_at?: string | null;
          category: string;
          created_at?: string;
          eta_days?: number;
          founding_cap?: number;
          founding_filled?: number;
          id?: string;
          launch_eta?: string | null;
          live_course_slug?: string | null;
          pitch?: string | null;
          slug: string;
          status?: Database["public"]["Enums"]["demand_track_status"];
          title: string;
          updated_at?: string;
          vote_threshold?: number;
          votes_count?: number;
        };
        Update: {
          build_started_at?: string | null;
          category?: string;
          created_at?: string;
          eta_days?: number;
          founding_cap?: number;
          founding_filled?: number;
          id?: string;
          launch_eta?: string | null;
          live_course_slug?: string | null;
          pitch?: string | null;
          slug?: string;
          status?: Database["public"]["Enums"]["demand_track_status"];
          title?: string;
          updated_at?: string;
          vote_threshold?: number;
          votes_count?: number;
        };
        Relationships: [];
      };
      demand_votes: {
        Row: {
          amount_inr: number;
          created_at: string;
          deleted_at: string | null;
          deleted_by: string | null;
          email: string | null;
          experience_level: string | null;
          id: string;
          is_founding: boolean;
          name: string;
          phone: string;
          reservation_status: Database["public"]["Enums"]["demand_reservation_status"];
          track_id: string;
          user_id: string | null;
          verified_at: string | null;
          why: string | null;
        };
        Insert: {
          amount_inr?: number;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email?: string | null;
          experience_level?: string | null;
          id?: string;
          is_founding?: boolean;
          name: string;
          phone: string;
          reservation_status?: Database["public"]["Enums"]["demand_reservation_status"];
          track_id: string;
          user_id?: string | null;
          verified_at?: string | null;
          why?: string | null;
        };
        Update: {
          amount_inr?: number;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          email?: string | null;
          experience_level?: string | null;
          id?: string;
          is_founding?: boolean;
          name?: string;
          phone?: string;
          reservation_status?: Database["public"]["Enums"]["demand_reservation_status"];
          track_id?: string;
          user_id?: string | null;
          verified_at?: string | null;
          why?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "demand_votes_track_id_fkey";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "demand_tracks";
            referencedColumns: ["id"];
          },
        ];
      };
      email_send_log: {
        Row: {
          created_at: string;
          error_message: string | null;
          id: string;
          message_id: string | null;
          metadata: Json | null;
          recipient_email: string;
          status: string;
          template_name: string;
        };
        Insert: {
          created_at?: string;
          error_message?: string | null;
          id?: string;
          message_id?: string | null;
          metadata?: Json | null;
          recipient_email: string;
          status: string;
          template_name: string;
        };
        Update: {
          created_at?: string;
          error_message?: string | null;
          id?: string;
          message_id?: string | null;
          metadata?: Json | null;
          recipient_email?: string;
          status?: string;
          template_name?: string;
        };
        Relationships: [];
      };
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number;
          batch_size: number;
          id: number;
          retry_after_until: string | null;
          send_delay_ms: number;
          transactional_email_ttl_minutes: number;
          updated_at: string;
        };
        Insert: {
          auth_email_ttl_minutes?: number;
          batch_size?: number;
          id?: number;
          retry_after_until?: string | null;
          send_delay_ms?: number;
          transactional_email_ttl_minutes?: number;
          updated_at?: string;
        };
        Update: {
          auth_email_ttl_minutes?: number;
          batch_size?: number;
          id?: number;
          retry_after_until?: string | null;
          send_delay_ms?: number;
          transactional_email_ttl_minutes?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      email_unsubscribe_tokens: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          token: string;
          used_at: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          token: string;
          used_at?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          token?: string;
          used_at?: string | null;
        };
        Relationships: [];
      };
      employer_jobs: {
        Row: {
          closes_at: string | null;
          created_at: string;
          created_by: string | null;
          description: string;
          employer_id: string;
          employment_type: string;
          experience_max_yrs: number | null;
          experience_min_yrs: number;
          id: string;
          location: string;
          opens_at: string | null;
          program_slug: string;
          salary_max_inr: number | null;
          salary_min_inr: number | null;
          skills: string[];
          status: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          closes_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          description: string;
          employer_id: string;
          employment_type?: string;
          experience_max_yrs?: number | null;
          experience_min_yrs?: number;
          id?: string;
          location: string;
          opens_at?: string | null;
          program_slug: string;
          salary_max_inr?: number | null;
          salary_min_inr?: number | null;
          skills?: string[];
          status?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          closes_at?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string;
          employer_id?: string;
          employment_type?: string;
          experience_max_yrs?: number | null;
          experience_min_yrs?: number;
          id?: string;
          location?: string;
          opens_at?: string | null;
          program_slug?: string;
          salary_max_inr?: number | null;
          salary_min_inr?: number | null;
          skills?: string[];
          status?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "employer_jobs_employer_id_fkey";
            columns: ["employer_id"];
            isOneToOne: false;
            referencedRelation: "employers";
            referencedColumns: ["id"];
          },
        ];
      };
      employer_members: {
        Row: {
          created_at: string;
          employer_id: string;
          id: string;
          member_role: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          employer_id: string;
          id?: string;
          member_role?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          employer_id?: string;
          id?: string;
          member_role?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "employer_members_employer_id_fkey";
            columns: ["employer_id"];
            isOneToOne: false;
            referencedRelation: "employers";
            referencedColumns: ["id"];
          },
        ];
      };
      employers: {
        Row: {
          contact_email: string | null;
          created_at: string;
          id: string;
          logo_url: string | null;
          name: string;
          notes: string | null;
          owner_user_id: string | null;
          slug: string;
          updated_at: string;
          verified_at: string | null;
          website: string | null;
        };
        Insert: {
          contact_email?: string | null;
          created_at?: string;
          id?: string;
          logo_url?: string | null;
          name: string;
          notes?: string | null;
          owner_user_id?: string | null;
          slug: string;
          updated_at?: string;
          verified_at?: string | null;
          website?: string | null;
        };
        Update: {
          contact_email?: string | null;
          created_at?: string;
          id?: string;
          logo_url?: string | null;
          name?: string;
          notes?: string | null;
          owner_user_id?: string | null;
          slug?: string;
          updated_at?: string;
          verified_at?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      enrolment_intents: {
        Row: {
          background: string | null;
          balance_due_at: string | null;
          balance_due_inr: number | null;
          balance_paid_at: string | null;
          base_price_inr: number;
          city: string | null;
          coupon_applied_at: string | null;
          coupon_code: string | null;
          coupon_expires_at: string | null;
          course_slug: string | null;
          created_at: string;
          deleted_at: string | null;
          deleted_by: string | null;
          discount_pct: number | null;
          email: string;
          exp_uid: string | null;
          failure_reason: string | null;
          final_price_inr: number | null;
          id: string;
          intent_token: string;
          lead_id: string | null;
          name: string;
          paid_at: string | null;
          phone: string;
          pre_registration_amount_inr: number | null;
          pre_registration_initiated_at: string | null;
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          recovery_email_sent_at: string | null;
          source: string | null;
          status: string;
          tier: string;
          updated_at: string;
          user_agent: string | null;
          utm_source: string | null;
          variant_cta: string | null;
          variant_layout: string | null;
        };
        Insert: {
          background?: string | null;
          balance_due_at?: string | null;
          balance_due_inr?: number | null;
          balance_paid_at?: string | null;
          base_price_inr: number;
          city?: string | null;
          coupon_applied_at?: string | null;
          coupon_code?: string | null;
          coupon_expires_at?: string | null;
          course_slug?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          discount_pct?: number | null;
          email: string;
          exp_uid?: string | null;
          failure_reason?: string | null;
          final_price_inr?: number | null;
          id?: string;
          intent_token?: string;
          lead_id?: string | null;
          name: string;
          paid_at?: string | null;
          phone: string;
          pre_registration_amount_inr?: number | null;
          pre_registration_initiated_at?: string | null;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          recovery_email_sent_at?: string | null;
          source?: string | null;
          status?: string;
          tier: string;
          updated_at?: string;
          user_agent?: string | null;
          utm_source?: string | null;
          variant_cta?: string | null;
          variant_layout?: string | null;
        };
        Update: {
          background?: string | null;
          balance_due_at?: string | null;
          balance_due_inr?: number | null;
          balance_paid_at?: string | null;
          base_price_inr?: number;
          city?: string | null;
          coupon_applied_at?: string | null;
          coupon_code?: string | null;
          coupon_expires_at?: string | null;
          course_slug?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          discount_pct?: number | null;
          email?: string;
          exp_uid?: string | null;
          failure_reason?: string | null;
          final_price_inr?: number | null;
          id?: string;
          intent_token?: string;
          lead_id?: string | null;
          name?: string;
          paid_at?: string | null;
          phone?: string;
          pre_registration_amount_inr?: number | null;
          pre_registration_initiated_at?: string | null;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          recovery_email_sent_at?: string | null;
          source?: string | null;
          status?: string;
          tier?: string;
          updated_at?: string;
          user_agent?: string | null;
          utm_source?: string | null;
          variant_cta?: string | null;
          variant_layout?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "enrolment_intents_coupon_code_fkey";
            columns: ["coupon_code"];
            isOneToOne: false;
            referencedRelation: "coupons";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "enrolment_intents_coupon_code_fkey";
            columns: ["coupon_code"];
            isOneToOne: false;
            referencedRelation: "v_active_promotions";
            referencedColumns: ["code"];
          },
          {
            foreignKeyName: "enrolment_intents_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "career_engine_leads";
            referencedColumns: ["id"];
          },
        ];
      };
      enrolments: {
        Row: {
          amount_inr: number;
          cohort_id: string | null;
          created_at: string;
          email: string;
          id: string;
          intent_id: string;
          paid_at: string;
          provisioned_at: string | null;
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          status: string;
          tier: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          amount_inr: number;
          cohort_id?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          intent_id: string;
          paid_at?: string;
          provisioned_at?: string | null;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          status?: string;
          tier: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          amount_inr?: number;
          cohort_id?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          intent_id?: string;
          paid_at?: string;
          provisioned_at?: string | null;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          status?: string;
          tier?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "enrolments_intent_id_fkey";
            columns: ["intent_id"];
            isOneToOne: false;
            referencedRelation: "enrolment_intents";
            referencedColumns: ["id"];
          },
        ];
      };
      experiment_events: {
        Row: {
          course_slug: string | null;
          created_at: string;
          event: string;
          experiment: string;
          id: string;
          props: Json;
          uid: string;
          variant: string;
        };
        Insert: {
          course_slug?: string | null;
          created_at?: string;
          event: string;
          experiment: string;
          id?: string;
          props?: Json;
          uid: string;
          variant: string;
        };
        Update: {
          course_slug?: string | null;
          created_at?: string;
          event?: string;
          experiment?: string;
          id?: string;
          props?: Json;
          uid?: string;
          variant?: string;
        };
        Relationships: [];
      };
      gsc_settings: {
        Row: {
          id: number;
          site_url: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: number;
          site_url: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: number;
          site_url?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      job_shortlists: {
        Row: {
          candidate_email: string | null;
          candidate_name: string;
          candidate_notes: string | null;
          candidate_phone: string | null;
          candidate_ref: string | null;
          created_at: string;
          created_by: string | null;
          employer_id: string;
          hired_at: string | null;
          id: string;
          job_id: string;
          placement_id: string | null;
          status: string;
          status_changed_at: string;
          updated_at: string;
        };
        Insert: {
          candidate_email?: string | null;
          candidate_name: string;
          candidate_notes?: string | null;
          candidate_phone?: string | null;
          candidate_ref?: string | null;
          created_at?: string;
          created_by?: string | null;
          employer_id: string;
          hired_at?: string | null;
          id?: string;
          job_id: string;
          placement_id?: string | null;
          status?: string;
          status_changed_at?: string;
          updated_at?: string;
        };
        Update: {
          candidate_email?: string | null;
          candidate_name?: string;
          candidate_notes?: string | null;
          candidate_phone?: string | null;
          candidate_ref?: string | null;
          created_at?: string;
          created_by?: string | null;
          employer_id?: string;
          hired_at?: string | null;
          id?: string;
          job_id?: string;
          placement_id?: string | null;
          status?: string;
          status_changed_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "job_shortlists_employer_id_fkey";
            columns: ["employer_id"];
            isOneToOne: false;
            referencedRelation: "employers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "job_shortlists_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "employer_jobs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "job_shortlists_placement_id_fkey";
            columns: ["placement_id"];
            isOneToOne: false;
            referencedRelation: "placements";
            referencedColumns: ["id"];
          },
        ];
      };
      landing_copy_changes: {
        Row: {
          actor_email: string | null;
          actor_id: string | null;
          after_text: string;
          before_text: string;
          changed_at: string;
          file_path: string;
          id: string;
          reason: string | null;
          section: string | null;
          source: string;
        };
        Insert: {
          actor_email?: string | null;
          actor_id?: string | null;
          after_text?: string;
          before_text?: string;
          changed_at?: string;
          file_path: string;
          id?: string;
          reason?: string | null;
          section?: string | null;
          source?: string;
        };
        Update: {
          actor_email?: string | null;
          actor_id?: string | null;
          after_text?: string;
          before_text?: string;
          changed_at?: string;
          file_path?: string;
          id?: string;
          reason?: string | null;
          section?: string | null;
          source?: string;
        };
        Relationships: [];
      };
      learning_modules: {
        Row: {
          created_at: string;
          deep_link: string;
          gaps: string[];
          id: string;
          lift: number;
          minutes: number;
          pillar: string;
          slug: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          deep_link?: string;
          gaps?: string[];
          id?: string;
          lift?: number;
          minutes?: number;
          pillar: string;
          slug: string;
          sort_order: number;
          title: string;
        };
        Update: {
          created_at?: string;
          deep_link?: string;
          gaps?: string[];
          id?: string;
          lift?: number;
          minutes?: number;
          pillar?: string;
          slug?: string;
          sort_order?: number;
          title?: string;
        };
        Relationships: [];
      };
      moment_images: {
        Row: {
          alt: string;
          caption: string | null;
          created_at: string;
          height: number | null;
          id: string;
          moment_id: string;
          position: number;
          storage_path: string;
          width: number | null;
        };
        Insert: {
          alt?: string;
          caption?: string | null;
          created_at?: string;
          height?: number | null;
          id?: string;
          moment_id: string;
          position?: number;
          storage_path: string;
          width?: number | null;
        };
        Update: {
          alt?: string;
          caption?: string | null;
          created_at?: string;
          height?: number | null;
          id?: string;
          moment_id?: string;
          position?: number;
          storage_path?: string;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "moment_images_moment_id_fkey";
            columns: ["moment_id"];
            isOneToOne: false;
            referencedRelation: "moments";
            referencedColumns: ["id"];
          },
        ];
      };
      moments: {
        Row: {
          body: string;
          category: string;
          cover_image_id: string | null;
          created_at: string;
          created_by: string | null;
          event_date: string;
          id: string;
          location: string | null;
          published_at: string | null;
          slug: string;
          status: string;
          subtitle: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          body?: string;
          category?: string;
          cover_image_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          event_date: string;
          id?: string;
          location?: string | null;
          published_at?: string | null;
          slug: string;
          status?: string;
          subtitle?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          body?: string;
          category?: string;
          cover_image_id?: string | null;
          created_at?: string;
          created_by?: string | null;
          event_date?: string;
          id?: string;
          location?: string | null;
          published_at?: string | null;
          slug?: string;
          status?: string;
          subtitle?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "moments_cover_image_fk";
            columns: ["cover_image_id"];
            isOneToOne: false;
            referencedRelation: "moment_images";
            referencedColumns: ["id"];
          },
        ];
      };
      payment_recovery_queue: {
        Row: {
          application_id: string;
          attempts: number;
          created_at: string;
          id: string;
          last_channel: string | null;
          last_error: string | null;
          max_attempts: number;
          next_send_at: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          application_id: string;
          attempts?: number;
          created_at?: string;
          id?: string;
          last_channel?: string | null;
          last_error?: string | null;
          max_attempts?: number;
          next_send_at?: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          application_id?: string;
          attempts?: number;
          created_at?: string;
          id?: string;
          last_channel?: string | null;
          last_error?: string | null;
          max_attempts?: number;
          next_send_at?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payment_recovery_queue_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "applications";
            referencedColumns: ["id"];
          },
        ];
      };
      placements: {
        Row: {
          candidate_ref: string;
          candidate_user_id: string | null;
          city: string;
          created_at: string;
          employer_id: string;
          evidence_notes: string | null;
          evidence_ref: string;
          evidence_source: Database["public"]["Enums"]["placement_evidence"];
          id: string;
          month_start: string;
          published: boolean;
          retracted_at: string | null;
          retracted_reason: string | null;
          role_title: string;
          salary_band_inr: string | null;
          updated_at: string;
          verified_at: string;
          verified_by: string | null;
        };
        Insert: {
          candidate_ref: string;
          candidate_user_id?: string | null;
          city: string;
          created_at?: string;
          employer_id: string;
          evidence_notes?: string | null;
          evidence_ref: string;
          evidence_source: Database["public"]["Enums"]["placement_evidence"];
          id?: string;
          month_start: string;
          published?: boolean;
          retracted_at?: string | null;
          retracted_reason?: string | null;
          role_title: string;
          salary_band_inr?: string | null;
          updated_at?: string;
          verified_at?: string;
          verified_by?: string | null;
        };
        Update: {
          candidate_ref?: string;
          candidate_user_id?: string | null;
          city?: string;
          created_at?: string;
          employer_id?: string;
          evidence_notes?: string | null;
          evidence_ref?: string;
          evidence_source?: Database["public"]["Enums"]["placement_evidence"];
          id?: string;
          month_start?: string;
          published?: boolean;
          retracted_at?: string | null;
          retracted_reason?: string | null;
          role_title?: string;
          salary_band_inr?: string | null;
          updated_at?: string;
          verified_at?: string;
          verified_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "placements_employer_id_fkey";
            columns: ["employer_id"];
            isOneToOne: false;
            referencedRelation: "employers";
            referencedColumns: ["id"];
          },
        ];
      };
      promotion_attributions: {
        Row: {
          campaign_id: string | null;
          channel: string | null;
          created_at: string;
          id: string;
          metadata: Json;
          owner_ref: string | null;
          owner_type: string | null;
          qr_slug: string | null;
          source: string;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_medium: string | null;
          utm_source: string | null;
        };
        Insert: {
          campaign_id?: string | null;
          channel?: string | null;
          created_at?: string;
          id?: string;
          metadata?: Json;
          owner_ref?: string | null;
          owner_type?: string | null;
          qr_slug?: string | null;
          source: string;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Update: {
          campaign_id?: string | null;
          channel?: string | null;
          created_at?: string;
          id?: string;
          metadata?: Json;
          owner_ref?: string | null;
          owner_type?: string | null;
          qr_slug?: string | null;
          source?: string;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "promotion_attributions_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "promotion_campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promotion_attributions_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "v_active_promotions";
            referencedColumns: ["campaign_id"];
          },
        ];
      };
      promotion_audience_rules: {
        Row: {
          campaign_id: string;
          rules: Json;
          updated_at: string;
        };
        Insert: {
          campaign_id: string;
          rules?: Json;
          updated_at?: string;
        };
        Update: {
          campaign_id?: string;
          rules?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "promotion_audience_rules_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: true;
            referencedRelation: "promotion_campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promotion_audience_rules_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: true;
            referencedRelation: "v_active_promotions";
            referencedColumns: ["campaign_id"];
          },
        ];
      };
      promotion_campaigns: {
        Row: {
          banner_image_url: string | null;
          budget_inr: number | null;
          created_at: string;
          created_by: string | null;
          description: string | null;
          ends_at: string | null;
          id: string;
          internal_notes: string | null;
          metadata: Json;
          name: string;
          priority: number;
          slug: string;
          starts_at: string | null;
          status: string;
          type_code: string;
          updated_at: string;
        };
        Insert: {
          banner_image_url?: string | null;
          budget_inr?: number | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          ends_at?: string | null;
          id?: string;
          internal_notes?: string | null;
          metadata?: Json;
          name: string;
          priority?: number;
          slug: string;
          starts_at?: string | null;
          status?: string;
          type_code: string;
          updated_at?: string;
        };
        Update: {
          banner_image_url?: string | null;
          budget_inr?: number | null;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          ends_at?: string | null;
          id?: string;
          internal_notes?: string | null;
          metadata?: Json;
          name?: string;
          priority?: number;
          slug?: string;
          starts_at?: string | null;
          status?: string;
          type_code?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "promotion_campaigns_type_code_fkey";
            columns: ["type_code"];
            isOneToOne: false;
            referencedRelation: "promotion_types";
            referencedColumns: ["code"];
          },
        ];
      };
      promotion_events: {
        Row: {
          amount_inr: number | null;
          attribution_id: string | null;
          campaign_id: string | null;
          coupon_code: string | null;
          discount_inr: number | null;
          email: string | null;
          event_type: string;
          id: string;
          intent_id: string | null;
          meta: Json;
          occurred_at: string;
          source: string | null;
          user_id: string | null;
        };
        Insert: {
          amount_inr?: number | null;
          attribution_id?: string | null;
          campaign_id?: string | null;
          coupon_code?: string | null;
          discount_inr?: number | null;
          email?: string | null;
          event_type: string;
          id?: string;
          intent_id?: string | null;
          meta?: Json;
          occurred_at?: string;
          source?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount_inr?: number | null;
          attribution_id?: string | null;
          campaign_id?: string | null;
          coupon_code?: string | null;
          discount_inr?: number | null;
          email?: string | null;
          event_type?: string;
          id?: string;
          intent_id?: string | null;
          meta?: Json;
          occurred_at?: string;
          source?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "promotion_events_attribution_id_fkey";
            columns: ["attribution_id"];
            isOneToOne: false;
            referencedRelation: "promotion_attributions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promotion_events_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "promotion_campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promotion_events_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "v_active_promotions";
            referencedColumns: ["campaign_id"];
          },
          {
            foreignKeyName: "promotion_events_intent_id_fkey";
            columns: ["intent_id"];
            isOneToOne: false;
            referencedRelation: "enrolment_intents";
            referencedColumns: ["id"];
          },
        ];
      };
      promotion_pricing_rules: {
        Row: {
          campaign_id: string;
          config: Json;
          model: string;
          updated_at: string;
        };
        Insert: {
          campaign_id: string;
          config?: Json;
          model?: string;
          updated_at?: string;
        };
        Update: {
          campaign_id?: string;
          config?: Json;
          model?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "promotion_pricing_rules_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: true;
            referencedRelation: "promotion_campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promotion_pricing_rules_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: true;
            referencedRelation: "v_active_promotions";
            referencedColumns: ["campaign_id"];
          },
        ];
      };
      promotion_stacking_rules: {
        Row: {
          campaign_id: string;
          config: Json;
          mode: string;
          updated_at: string;
        };
        Insert: {
          campaign_id: string;
          config?: Json;
          mode?: string;
          updated_at?: string;
        };
        Update: {
          campaign_id?: string;
          config?: Json;
          mode?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "promotion_stacking_rules_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: true;
            referencedRelation: "promotion_campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promotion_stacking_rules_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: true;
            referencedRelation: "v_active_promotions";
            referencedColumns: ["campaign_id"];
          },
        ];
      };
      promotion_time_rules: {
        Row: {
          campaign_id: string;
          config: Json;
          countdown_minutes: number | null;
          ends_at: string | null;
          flash: boolean;
          starts_at: string | null;
          time_of_day_end: string | null;
          time_of_day_start: string | null;
          updated_at: string;
          weekdays: number[] | null;
        };
        Insert: {
          campaign_id: string;
          config?: Json;
          countdown_minutes?: number | null;
          ends_at?: string | null;
          flash?: boolean;
          starts_at?: string | null;
          time_of_day_end?: string | null;
          time_of_day_start?: string | null;
          updated_at?: string;
          weekdays?: number[] | null;
        };
        Update: {
          campaign_id?: string;
          config?: Json;
          countdown_minutes?: number | null;
          ends_at?: string | null;
          flash?: boolean;
          starts_at?: string | null;
          time_of_day_end?: string | null;
          time_of_day_start?: string | null;
          updated_at?: string;
          weekdays?: number[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "promotion_time_rules_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: true;
            referencedRelation: "promotion_campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promotion_time_rules_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: true;
            referencedRelation: "v_active_promotions";
            referencedColumns: ["campaign_id"];
          },
        ];
      };
      promotion_types: {
        Row: {
          code: string;
          created_at: string;
          description: string | null;
          is_active: boolean;
          label: string;
          sort_order: number;
        };
        Insert: {
          code: string;
          created_at?: string;
          description?: string | null;
          is_active?: boolean;
          label: string;
          sort_order?: number;
        };
        Update: {
          code?: string;
          created_at?: string;
          description?: string | null;
          is_active?: boolean;
          label?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      promotion_usage_rules: {
        Row: {
          campaign_id: string;
          config: Json;
          global_limit: number | null;
          monthly_limit: number | null;
          per_campaign: number | null;
          per_email: number | null;
          per_phone: number | null;
          per_referral: number | null;
          per_user: number | null;
          unlimited: boolean;
          updated_at: string;
          yearly_limit: number | null;
        };
        Insert: {
          campaign_id: string;
          config?: Json;
          global_limit?: number | null;
          monthly_limit?: number | null;
          per_campaign?: number | null;
          per_email?: number | null;
          per_phone?: number | null;
          per_referral?: number | null;
          per_user?: number | null;
          unlimited?: boolean;
          updated_at?: string;
          yearly_limit?: number | null;
        };
        Update: {
          campaign_id?: string;
          config?: Json;
          global_limit?: number | null;
          monthly_limit?: number | null;
          per_campaign?: number | null;
          per_email?: number | null;
          per_phone?: number | null;
          per_referral?: number | null;
          per_user?: number | null;
          unlimited?: boolean;
          updated_at?: string;
          yearly_limit?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "promotion_usage_rules_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: true;
            referencedRelation: "promotion_campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "promotion_usage_rules_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: true;
            referencedRelation: "v_active_promotions";
            referencedColumns: ["campaign_id"];
          },
        ];
      };
      readiness_journey: {
        Row: {
          amount_inr: number | null;
          archetype: string | null;
          created_at: string;
          id: string;
          lead_id: string | null;
          paid_at: string | null;
          score_band: string | null;
          session_id: string;
          started_at: string | null;
          submitted_at: string | null;
          updated_at: string;
          utm: Json | null;
        };
        Insert: {
          amount_inr?: number | null;
          archetype?: string | null;
          created_at?: string;
          id?: string;
          lead_id?: string | null;
          paid_at?: string | null;
          score_band?: string | null;
          session_id: string;
          started_at?: string | null;
          submitted_at?: string | null;
          updated_at?: string;
          utm?: Json | null;
        };
        Update: {
          amount_inr?: number | null;
          archetype?: string | null;
          created_at?: string;
          id?: string;
          lead_id?: string | null;
          paid_at?: string | null;
          score_band?: string | null;
          session_id?: string;
          started_at?: string | null;
          submitted_at?: string | null;
          updated_at?: string;
          utm?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "readiness_journey_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "career_engine_leads";
            referencedColumns: ["id"];
          },
        ];
      };
      recommendation_outcomes: {
        Row: {
          base_ctc: number | null;
          chosen_at: string | null;
          chosen_role_slug: string | null;
          created_at: string;
          employer: string | null;
          id: string;
          joined_at: string | null;
          lead_id: string;
          recommended_at: string | null;
          recommended_family_id: string | null;
          recommended_role_slug: string | null;
          source: string;
          stage: string;
          status_last_checked_at: string | null;
          still_in_role: boolean | null;
          updated_at: string;
          user_email: string | null;
          user_id: string | null;
        };
        Insert: {
          base_ctc?: number | null;
          chosen_at?: string | null;
          chosen_role_slug?: string | null;
          created_at?: string;
          employer?: string | null;
          id?: string;
          joined_at?: string | null;
          lead_id: string;
          recommended_at?: string | null;
          recommended_family_id?: string | null;
          recommended_role_slug?: string | null;
          source?: string;
          stage?: string;
          status_last_checked_at?: string | null;
          still_in_role?: boolean | null;
          updated_at?: string;
          user_email?: string | null;
          user_id?: string | null;
        };
        Update: {
          base_ctc?: number | null;
          chosen_at?: string | null;
          chosen_role_slug?: string | null;
          created_at?: string;
          employer?: string | null;
          id?: string;
          joined_at?: string | null;
          lead_id?: string;
          recommended_at?: string | null;
          recommended_family_id?: string | null;
          recommended_role_slug?: string | null;
          source?: string;
          stage?: string;
          status_last_checked_at?: string | null;
          still_in_role?: boolean | null;
          updated_at?: string;
          user_email?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      recruiter_profile_views: {
        Row: {
          id: string;
          user_id: string;
          viewed_at: string;
          viewer_org: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          viewed_at?: string;
          viewer_org?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          viewed_at?: string;
          viewer_org?: string | null;
        };
        Relationships: [];
      };
      referral_attributions: {
        Row: {
          attributed_at: string;
          id: string;
          landing_path: string | null;
          lead_id: string | null;
          referral_code: string;
          user_agent: string | null;
        };
        Insert: {
          attributed_at?: string;
          id?: string;
          landing_path?: string | null;
          lead_id?: string | null;
          referral_code: string;
          user_agent?: string | null;
        };
        Update: {
          attributed_at?: string;
          id?: string;
          landing_path?: string | null;
          lead_id?: string | null;
          referral_code?: string;
          user_agent?: string | null;
        };
        Relationships: [];
      };
      referral_codes: {
        Row: {
          active: boolean;
          code: string;
          created_at: string;
          id: string;
          referee_discount_inr: number;
          referrer_name: string | null;
          referrer_payout_inr: number;
          referrer_phone: string | null;
          uses: number;
        };
        Insert: {
          active?: boolean;
          code: string;
          created_at?: string;
          id?: string;
          referee_discount_inr?: number;
          referrer_name?: string | null;
          referrer_payout_inr?: number;
          referrer_phone?: string | null;
          uses?: number;
        };
        Update: {
          active?: boolean;
          code?: string;
          created_at?: string;
          id?: string;
          referee_discount_inr?: number;
          referrer_name?: string | null;
          referrer_payout_inr?: number;
          referrer_phone?: string | null;
          uses?: number;
        };
        Relationships: [];
      };
      report_progress: {
        Row: {
          created_at: string;
          employer_tracker: Json;
          quiz_profile: Json | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          employer_tracker?: Json;
          quiz_profile?: Json | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          employer_tracker?: Json;
          quiz_profile?: Json | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      retention_checkins: {
        Row: {
          channel: string;
          checkin_type: string;
          created_at: string;
          due_at: string;
          id: string;
          outcome_id: string;
          responded_at: string | null;
          response_json: Json | null;
          sent_at: string | null;
          token: string;
          updated_at: string;
        };
        Insert: {
          channel?: string;
          checkin_type: string;
          created_at?: string;
          due_at?: string;
          id?: string;
          outcome_id: string;
          responded_at?: string | null;
          response_json?: Json | null;
          sent_at?: string | null;
          token: string;
          updated_at?: string;
        };
        Update: {
          channel?: string;
          checkin_type?: string;
          created_at?: string;
          due_at?: string;
          id?: string;
          outcome_id?: string;
          responded_at?: string | null;
          response_json?: Json | null;
          sent_at?: string | null;
          token?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "retention_checkins_outcome_id_fkey";
            columns: ["outcome_id"];
            isOneToOne: false;
            referencedRelation: "recommendation_outcomes";
            referencedColumns: ["id"];
          },
        ];
      };
      rls_incidents: {
        Row: {
          context: Json;
          db_role: string | null;
          function_name: string;
          id: string;
          message: string;
          observed_at: string;
          path: string | null;
          user_id: string | null;
        };
        Insert: {
          context?: Json;
          db_role?: string | null;
          function_name: string;
          id?: string;
          message: string;
          observed_at?: string;
          path?: string | null;
          user_id?: string | null;
        };
        Update: {
          context?: Json;
          db_role?: string | null;
          function_name?: string;
          id?: string;
          message?: string;
          observed_at?: string;
          path?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      seo_alert_config: {
        Row: {
          drop_pct: number;
          id: number;
          min_impressions: number;
          updated_at: string;
        };
        Insert: {
          drop_pct?: number;
          id?: number;
          min_impressions?: number;
          updated_at?: string;
        };
        Update: {
          drop_pct?: number;
          id?: number;
          min_impressions?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      seo_alerts: {
        Row: {
          acknowledged_at: string | null;
          acknowledged_by: string | null;
          created_at: string;
          curr_value: number;
          curr_window_end: string;
          curr_window_start: string;
          id: string;
          metric: string;
          pct_change: number;
          prev_value: number;
          prev_window_end: string;
          prev_window_start: string;
          query: string;
        };
        Insert: {
          acknowledged_at?: string | null;
          acknowledged_by?: string | null;
          created_at?: string;
          curr_value: number;
          curr_window_end: string;
          curr_window_start: string;
          id?: string;
          metric: string;
          pct_change: number;
          prev_value: number;
          prev_window_end: string;
          prev_window_start: string;
          query: string;
        };
        Update: {
          acknowledged_at?: string | null;
          acknowledged_by?: string | null;
          created_at?: string;
          curr_value?: number;
          curr_window_end?: string;
          curr_window_start?: string;
          id?: string;
          metric?: string;
          pct_change?: number;
          prev_value?: number;
          prev_window_end?: string;
          prev_window_start?: string;
          query?: string;
        };
        Relationships: [];
      };
      seo_query_snapshots: {
        Row: {
          captured_at: string;
          clicks: number;
          ctr: number;
          id: string;
          impressions: number;
          position: number;
          query: string;
          window_end: string;
          window_start: string;
        };
        Insert: {
          captured_at?: string;
          clicks?: number;
          ctr?: number;
          id?: string;
          impressions?: number;
          position?: number;
          query: string;
          window_end: string;
          window_start: string;
        };
        Update: {
          captured_at?: string;
          clicks?: number;
          ctr?: number;
          id?: string;
          impressions?: number;
          position?: number;
          query?: string;
          window_end?: string;
          window_start?: string;
        };
        Relationships: [];
      };
      status_components: {
        Row: {
          id: string;
          name: string;
          note: string | null;
          state: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          note?: string | null;
          state: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          note?: string | null;
          state?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      student_module_progress: {
        Row: {
          completed_at: string | null;
          id: string;
          module_id: string;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          completed_at?: string | null;
          id?: string;
          module_id: string;
          status: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          completed_at?: string | null;
          id?: string;
          module_id?: string;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "student_module_progress_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "learning_modules";
            referencedColumns: ["id"];
          },
        ];
      };
      student_weekly_goals: {
        Row: {
          done: boolean;
          id: string;
          module_id: string | null;
          task: string;
          updated_at: string;
          user_id: string;
          week_start: string;
        };
        Insert: {
          done?: boolean;
          id?: string;
          module_id?: string | null;
          task: string;
          updated_at?: string;
          user_id: string;
          week_start: string;
        };
        Update: {
          done?: boolean;
          id?: string;
          module_id?: string | null;
          task?: string;
          updated_at?: string;
          user_id?: string;
          week_start?: string;
        };
        Relationships: [
          {
            foreignKeyName: "student_weekly_goals_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "learning_modules";
            referencedColumns: ["id"];
          },
        ];
      };
      submissions: {
        Row: {
          artifact_url: string | null;
          created_at: string;
          enrolment_id: string;
          id: string;
          mentor_feedback: string | null;
          notes: string | null;
          reviewed_at: string | null;
          status: string;
          submitted_at: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          artifact_url?: string | null;
          created_at?: string;
          enrolment_id: string;
          id?: string;
          mentor_feedback?: string | null;
          notes?: string | null;
          reviewed_at?: string | null;
          status?: string;
          submitted_at?: string;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          artifact_url?: string | null;
          created_at?: string;
          enrolment_id?: string;
          id?: string;
          mentor_feedback?: string | null;
          notes?: string | null;
          reviewed_at?: string | null;
          status?: string;
          submitted_at?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "submissions_enrolment_id_fkey";
            columns: ["enrolment_id"];
            isOneToOne: false;
            referencedRelation: "enrolments";
            referencedColumns: ["id"];
          },
        ];
      };
      suppressed_emails: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          metadata: Json | null;
          reason: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          metadata?: Json | null;
          reason: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          metadata?: Json | null;
          reason?: string;
        };
        Relationships: [];
      };
      trust_ledger: {
        Row: {
          amount_inr: number | null;
          created_at: string;
          detail: string | null;
          headline: string;
          id: string;
          kind: string;
          occurred_on: string;
          resolved: boolean;
        };
        Insert: {
          amount_inr?: number | null;
          created_at?: string;
          detail?: string | null;
          headline: string;
          id?: string;
          kind: string;
          occurred_on: string;
          resolved?: boolean;
        };
        Update: {
          amount_inr?: number | null;
          created_at?: string;
          detail?: string | null;
          headline?: string;
          id?: string;
          kind?: string;
          occurred_on?: string;
          resolved?: boolean;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          deleted_by: string | null;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          deleted_by?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      verification_audit: {
        Row: {
          candidate_ref: string;
          event_type: string;
          id: string;
          occurred_at: string;
          viewer_org_tag: string | null;
        };
        Insert: {
          candidate_ref: string;
          event_type: string;
          id?: string;
          occurred_at?: string;
          viewer_org_tag?: string | null;
        };
        Update: {
          candidate_ref?: string;
          event_type?: string;
          id?: string;
          occurred_at?: string;
          viewer_org_tag?: string | null;
        };
        Relationships: [];
      };
      webhook_events: {
        Row: {
          event_id: string;
          event_type: string | null;
          id: string;
          provider: string;
          received_at: string;
        };
        Insert: {
          event_id: string;
          event_type?: string | null;
          id?: string;
          provider: string;
          received_at?: string;
        };
        Update: {
          event_id?: string;
          event_type?: string | null;
          id?: string;
          provider?: string;
          received_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      ce_funnel_summary: {
        Row: {
          cohorts_set: number | null;
          day: string | null;
          leads_created: number | null;
          leads_finalized: number | null;
          rate_limited: number | null;
          rejections: number | null;
          sessions_started: number | null;
          sessions_with_answers: number | null;
        };
        Relationships: [];
      };
      demand_vote_counts: {
        Row: {
          track_id: string | null;
          verified_count: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "demand_votes_track_id_fkey";
            columns: ["track_id"];
            isOneToOne: false;
            referencedRelation: "demand_tracks";
            referencedColumns: ["id"];
          },
        ];
      };
      v_active_promotions: {
        Row: {
          campaign_id: string | null;
          campaign_name: string | null;
          campaign_slug: string | null;
          campaign_status: string | null;
          code: string | null;
          discount_pct: number | null;
          ends_at: string | null;
          is_active: boolean | null;
          max_uses_per_email: number | null;
          priority: number | null;
          starts_at: string | null;
          type_code: string | null;
          window_minutes: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "promotion_campaigns_type_code_fkey";
            columns: ["type_code"];
            isOneToOne: false;
            referencedRelation: "promotion_types";
            referencedColumns: ["code"];
          },
        ];
      };
      vw_apply_funnel_sessions: {
        Row: {
          anon_id: string | null;
          assigned_variant: string | null;
          cta_at: string | null;
          cta_variant: string | null;
          reached_form: boolean | null;
          reached_submit: boolean | null;
          session_id: string | null;
          started_at: string | null;
          submitted_at: string | null;
          surface: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      accept_admin_invite: {
        Args: { p_token: string };
        Returns: Database["public"]["Enums"]["app_role"];
      };
      admin_cohort_audit: {
        Args: { p_id?: string; p_limit?: number };
        Returns: {
          action: string;
          actor_id: string | null;
          after: Json | null;
          before: Json | null;
          cohort_id: string;
          id: string;
          occurred_at: string;
        }[];
        SetofOptions: {
          from: "*";
          to: "cohort_audit_log";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      admin_list_cohorts: {
        Args: never;
        Returns: {
          created_at: string;
          display_label: string;
          id: string;
          is_locked: boolean;
          lock_at: string;
          lock_reason: string | null;
          seats_cap: number;
          seats_taken: number;
          starts_at: string;
          updated_at: string;
        }[];
        SetofOptions: {
          from: "*";
          to: "cohorts";
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      admin_rate_hit: {
        Args: { _action: string; _max: number; _window_seconds: number };
        Returns: boolean;
      };
      admin_set_cohort_capacity: {
        Args: { p_cap: number; p_id: string };
        Returns: undefined;
      };
      admin_set_cohort_lock: {
        Args: { p_id: string; p_locked: boolean; p_reason?: string };
        Returns: undefined;
      };
      apply_enrolment_coupon: {
        Args: { p_code: string; p_intent_id: string; p_intent_token: string };
        Returns: {
          coupon_code: string;
          coupon_expires_at: string;
          discount_pct: number;
          final_price_inr: number;
          status: string;
        }[];
      };
      attach_razorpay_order: {
        Args: { p_intent_id: string; p_order_id: string };
        Returns: undefined;
      };
      ce_assert_session_owner: {
        Args: { p_session_id: string; p_session_token: string };
        Returns: undefined;
      };
      ce_create_lead_early: {
        Args: {
          p_email: string;
          p_name: string;
          p_phone: string;
          p_session_id: string;
          p_session_token: string;
          p_whatsapp_optin: boolean;
        };
        Returns: string;
      };
      ce_finalize_lead: {
        Args: {
          p_archetype: string;
          p_fit_score: number;
          p_lead_id: string;
          p_result_payload: Json;
          p_session_token: string;
          p_top_paths: Json;
        };
        Returns: undefined;
      };
      ce_get_result: {
        Args: { p_lead_id: string };
        Returns: {
          archetype: string;
          created_at: string;
          fit_score: number;
          result_payload: Json;
          top_paths: Json;
        }[];
      };
      ce_log_server_event: {
        Args: {
          p_event: string;
          p_lead_id?: string;
          p_props?: Json;
          p_session_id?: string;
        };
        Returns: undefined;
      };
      ce_rate_hit: {
        Args: { p_key: string; p_max: number; p_window_seconds: number };
        Returns: boolean;
      };
      ce_record_answer: {
        Args: {
          p_answer: string;
          p_question_id: string;
          p_session_id: string;
          p_session_token: string;
        };
        Returns: undefined;
      };
      ce_session_trace: {
        Args: { p_session_id: string };
        Returns: {
          answer: string;
          at: string;
          event: string;
          props: Json;
          question_id: string;
          source: string;
        }[];
      };
      ce_set_cohort: {
        Args: {
          p_cohort_id: string;
          p_lead_id: string;
          p_session_token: string;
        };
        Returns: undefined;
      };
      ce_start_session: {
        Args: {
          p_client_fp?: string;
          p_device?: string;
          p_honeypot?: string;
          p_stream?: string;
          p_user_agent?: string;
          p_utm_source?: string;
        };
        Returns: {
          session_id: string;
          session_token: string;
        }[];
      };
      ce_submit_lead: {
        Args: {
          p_archetype: string;
          p_email: string;
          p_fit_score: number;
          p_name: string;
          p_phone: string;
          p_result_payload: Json;
          p_session_id: string;
          p_session_token: string;
          p_top_paths: Json;
          p_whatsapp_optin: boolean;
        };
        Returns: string;
      };
      check_analytics_anomalies: { Args: never; Returns: number };
      check_rls_incidents: {
        Args: { _min_count?: number; _window_minutes?: number };
        Returns: number;
      };
      claim_due_retention_checkins: {
        Args: { p_limit?: number };
        Returns: {
          checkin_type: string;
          chosen_role_slug: string;
          due_at: string;
          id: string;
          outcome_id: string;
          recommended_family_id: string;
          token: string;
          user_email: string;
        }[];
      };
      cohort_claim_seat: { Args: { p_id: string }; Returns: number };
      cohort_release_seat: { Args: { p_id: string }; Returns: number };
      create_enrolment_intent: {
        Args: {
          p_background: string;
          p_base_price_inr: number;
          p_city: string;
          p_email: string;
          p_lead_id?: string;
          p_name: string;
          p_phone: string;
          p_tier: string;
          p_user_agent?: string;
          p_utm_source?: string;
        };
        Returns: {
          id: string;
          intent_token: string;
        }[];
      };
      delete_email: {
        Args: { message_id: number; queue_name: string };
        Returns: boolean;
      };
      ei_assert_owner: {
        Args: { p_intent_id: string; p_intent_token: string };
        Returns: undefined;
      };
      employer_submit_placement_evidence: {
        Args: {
          p_candidate_ref: string;
          p_city: string;
          p_evidence_notes: string;
          p_evidence_ref: string;
          p_evidence_source: string;
          p_month_start: string;
          p_role_title: string;
          p_salary_band_inr: string;
          p_shortlist_id: string;
        };
        Returns: string;
      };
      enqueue_email: {
        Args: { payload: Json; queue_name: string };
        Returns: number;
      };
      enqueue_retention_checkins: { Args: never; Returns: number };
      expire_enrolment_coupon: {
        Args: { p_intent_id: string; p_intent_token: string };
        Returns: {
          base_price_inr: number;
          coupon_code: string;
          coupon_expires_at: string;
          discount_pct: number;
          email: string;
          final_price_inr: number;
          id: string;
          name: string;
          phone: string;
          razorpay_order_id: string;
          status: string;
          tier: string;
        }[];
      };
      get_artifact_request_by_token: {
        Args: { p_token: string };
        Returns: {
          candidate_ref: string;
          created_at: string;
          expires_at: string;
          id: string;
          jd_task: string;
          recruiter_email: string;
          recruiter_org: string;
          status: string;
        }[];
      };
      get_cohort_status: {
        Args: { p_id: string };
        Returns: {
          display_label: string;
          effective_locked: boolean;
          id: string;
          is_locked: boolean;
          lock_at: string;
          lock_reason: string;
          seats_cap: number;
          seats_left: number;
          seats_taken: number;
          server_now: string;
          starts_at: string;
        }[];
      };
      get_enrolment_intent: {
        Args: { p_intent_id: string; p_intent_token: string };
        Returns: {
          balance_due_at: string;
          balance_due_inr: number;
          balance_paid_at: string;
          base_price_inr: number;
          coupon_code: string;
          coupon_expires_at: string;
          discount_pct: number;
          email: string;
          failure_reason: string;
          final_price_inr: number;
          id: string;
          name: string;
          paid_at: string;
          phone: string;
          pre_registration_amount_inr: number;
          pre_registration_initiated_at: string;
          razorpay_order_id: string;
          razorpay_payment_id: string;
          status: string;
          tier: string;
        }[];
      };
      get_retention_stat: {
        Args: { p_family: string; p_role?: string };
        Returns: {
          family_id: string;
          role_slug: string;
          total_chose: number;
          total_in_role: number;
          total_recommended: number;
          total_still_in_role_12mo: number;
        }[];
      };
      get_verification_audit: {
        Args: { _candidate_ref: string };
        Returns: {
          candidate_ref: string;
          event_type: string;
          id: string;
          occurred_at: string;
          viewer_org_tag: string;
        }[];
      };
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][];
          _user_id: string;
        };
        Returns: boolean;
      };
      has_employer_access: {
        Args: { _employer_id: string; _user_id: string };
        Returns: boolean;
      };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      list_admin_activity: {
        Args: {
          _action?: string;
          _actor_id?: string;
          _limit?: number;
          _resource?: string;
          _since?: string;
        };
        Returns: {
          action: string;
          actor_id: string;
          diff: Json;
          id: string;
          occurred_at: string;
          record_id: string;
          table_name: string;
        }[];
      };
      list_my_employers: {
        Args: never;
        Returns: {
          employer_id: string;
          logo_url: string;
          member_role: string;
          name: string;
          slug: string;
          verified_at: string;
        }[];
      };
      list_verified_placements: {
        Args: { _limit?: number };
        Returns: {
          candidate_ref: string;
          city: string;
          employer_logo_url: string;
          employer_name: string;
          employer_slug: string;
          evidence_source: Database["public"]["Enums"]["placement_evidence"];
          id: string;
          month_start: string;
          role_title: string;
          salary_band_inr: string;
          verified_at: string;
        }[];
      };
      log_admin_action: {
        Args: {
          _action: string;
          _diff: Json;
          _record_id: string;
          _resource: string;
        };
        Returns: string;
      };
      log_promotion_event: {
        Args: {
          p_amount_inr?: number;
          p_coupon_code?: string;
          p_discount_inr?: number;
          p_email?: string;
          p_event_type: string;
          p_intent_id?: string;
          p_meta?: Json;
          p_source?: string;
        };
        Returns: string;
      };
      lookup_admin_invite: {
        Args: { p_token: string };
        Returns: {
          email: string;
          expires_at: string;
          role: Database["public"]["Enums"]["app_role"];
          used: boolean;
        }[];
      };
      lookup_referral_code: {
        Args: { p_code: string };
        Returns: {
          active: boolean;
          code: string;
          referee_discount_inr: number;
        }[];
      };
      mark_alerts_notified: { Args: { _ids: string[] }; Returns: undefined };
      mark_backup_alerts_notified: {
        Args: { _ids: string[] };
        Returns: undefined;
      };
      mark_enrolment_failed: {
        Args: {
          p_intent_id: string;
          p_order_id: string;
          p_payment_id: string;
          p_reason: string;
        };
        Returns: undefined;
      };
      mark_enrolment_paid: { Args: { p_intent_id: string }; Returns: undefined };
      mark_enrolment_paid_with_payment: {
        Args: { p_intent_id: string; p_order_id: string; p_payment_id: string };
        Returns: undefined;
      };
      mark_prereg_initiated: {
        Args: {
          p_amount: number;
          p_balance: number;
          p_intent_id: string;
          p_intent_token: string;
        };
        Returns: {
          balance_due_at: string;
          balance_due_inr: number;
          id: string;
          pre_registration_amount_inr: number;
          pre_registration_initiated_at: string;
        }[];
      };
      mark_readiness_journey: {
        Args: {
          _amount_inr?: number;
          _archetype?: string;
          _kind: string;
          _lead_id?: string;
          _score_band?: string;
          _session_id: string;
          _utm?: Json;
        };
        Returns: undefined;
      };
      mark_readiness_paid_by_lead: {
        Args: { _amount_inr?: number; _lead_id: string };
        Returns: undefined;
      };
      move_to_dlq: {
        Args: {
          dlq_name: string;
          message_id: number;
          payload: Json;
          source_queue: string;
        };
        Returns: number;
      };
      pending_alert_payloads: {
        Args: { _limit?: number };
        Returns: {
          body: Json;
          fired_at: string;
          id: string;
          kind: string;
          title: string;
        }[];
      };
      provision_enrolment_from_intent: {
        Args: { p_cohort_id?: string; p_intent_id: string };
        Returns: {
          created: boolean;
          enrolment_id: string;
          user_email: string;
        }[];
      };
      prune_analytics_events: { Args: { _days?: number }; Returns: number };
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number };
        Returns: {
          message: Json;
          msg_id: number;
          read_ct: number;
        }[];
      };
      record_admin_export: {
        Args: { _details?: Json; _resource: string; _row_count: number };
        Returns: undefined;
      };
      record_recommendation_outcome: {
        Args: {
          p_chosen_role_slug: string;
          p_family_id: string;
          p_lead_id: string;
          p_recommended_role_slug: string;
          p_stage: string;
        };
        Returns: Json;
      };
      record_retention_response: {
        Args: { p_response?: Json; p_still_in_role: boolean; p_token: string };
        Returns: undefined;
      };
      request_demand_track: {
        Args: {
          p_category: string;
          p_email: string;
          p_experience_level: string;
          p_name: string;
          p_phone: string;
          p_pitch: string;
          p_title: string;
          p_why: string;
        };
        Returns: Json;
      };
      submit_application: {
        Args: {
          p_email: string;
          p_lead_id?: string;
          p_name: string;
          p_phone: string;
          p_program_name?: string;
          p_program_slug: string;
          p_user_agent?: string;
          p_utm_source?: string;
          p_whatsapp_optin?: boolean;
        };
        Returns: string;
      };
      submit_course_enquiry: {
        Args: {
          p_base_price_inr: number;
          p_city: string;
          p_course_slug: string;
          p_email: string;
          p_exp_uid: string;
          p_name: string;
          p_phone: string;
          p_placement: string;
          p_preferred_slot: string;
          p_user_agent?: string;
          p_utm_source?: string;
          p_variant_cta: string;
          p_variant_layout: string;
        };
        Returns: {
          id: string;
          intent_token: string;
        }[];
      };
      track_event: {
        Args: {
          p_anon_id?: string;
          p_application_id?: string;
          p_cohort?: string;
          p_event_name: string;
          p_ip_hash?: string;
          p_lead_id?: string;
          p_path?: string;
          p_program_slug?: string;
          p_props?: Json;
          p_referrer?: string;
          p_session_id?: string;
          p_user_agent?: string;
          p_user_id?: string;
          p_utm_source?: string;
        };
        Returns: string;
      };
    };
    Enums: {
      app_role: "admin" | "user" | "reviewer" | "support" | "viewer" | "analyst" | "exporter";
      application_status:
        | "submitted"
        | "reviewing"
        | "shortlisted"
        | "rejected"
        | "accepted"
        | "enrolled"
        | "withdrawn";
      demand_milestone_status: "pending" | "in_progress" | "done";
      demand_partner_type: "mentor" | "internship";
      demand_reservation_status: "pending" | "paid" | "refunded" | "waived";
      demand_track_status: "voting" | "building" | "live";
      placement_evidence:
        | "signed_offer_letter"
        | "employer_hr_email"
        | "payslip"
        | "joining_letter"
        | "linkedin_confirmation";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "reviewer", "support", "viewer", "analyst", "exporter"],
      application_status: [
        "submitted",
        "reviewing",
        "shortlisted",
        "rejected",
        "accepted",
        "enrolled",
        "withdrawn",
      ],
      demand_milestone_status: ["pending", "in_progress", "done"],
      demand_partner_type: ["mentor", "internship"],
      demand_reservation_status: ["pending", "paid", "refunded", "waived"],
      demand_track_status: ["voting", "building", "live"],
      placement_evidence: [
        "signed_offer_letter",
        "employer_hr_email",
        "payslip",
        "joining_letter",
        "linkedin_confirmation",
      ],
    },
  },
} as const;
